import React, { useRef, useState } from 'react';
import axios from 'axios';
import {FaBold, FaItalic, FaAlignLeft, FaAlignRight, FaAlignCenter, FaUnderline, FaAlignJustify, FaLink, FaYoutube, FaTableColumns} from 'react-icons/fa6';
import { MdImage, MdOutlineFormatListNumbered } from 'react-icons/md';
import { LiaUndoSolid, LiaRedoSolid } from 'react-icons/lia';
import { PiListBulletsBold } from 'react-icons/pi';
import './css/customHtmlEditor.css'; // Ensure your CSS is correctly imported
import LinkModal from './linkModal'; // Import the LinkModal component
import YouTubeModal from './youtubeModal'; // Import the YouTubeModal component
import ImagePropertiesModal from './imagePropertiesModal'; // Import the ImagePropertiesModal component

const CustomHtmlEditor = ({ onChange, uploadUrl }) => {
  const editorRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [currentLinkUrl, setCurrentLinkUrl] = useState('');
  const [savedRange, setSavedRange] = useState(null);
  const [isYouTubeModalOpen, setYouTubeModalOpen] = useState(false);
  const [isImagePropertiesModalOpen, setImagePropertiesModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isColumnMode, setColumnMode] = useState(false);

  const toggleColumnMode = () => {
    setColumnMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        // Create column structure if it doesn't exist
        if (!editorRef.current.querySelector('.column-container')) {
          const columnContainer = document.createElement('div');
          columnContainer.classList.add('column-container');
          columnContainer.innerHTML = '<div class="column"></div><div class="column"></div>';
          editorRef.current.appendChild(columnContainer);
        }
      } else {
        // Remove column structure if it exists
        const columnContainer = editorRef.current.querySelector('.column-container');
        if (columnContainer) {
          // Move all content from columns back to the main editor
          editorRef.current.innerHTML += columnContainer.innerHTML;
          columnContainer.remove();
        }
      }
      onChange(editorRef.current.innerHTML);
      return newMode;
    });
  };

  const applyAlignment = (align) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let node = range.startContainer;
  
      // Function to apply alignment to a node
      const applyAlignmentToNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node = node.parentNode;
        }
        
        if (node.classList.contains('image-container')) {
          // Remove existing alignment classes
          node.classList.remove('align-left', 'align-center', 'align-right');
          // Add new alignment class
          node.classList.add(`align-${align.toLowerCase()}`);
        } else {
          node.style.textAlign = align.toLowerCase();
        }
      };
  
      // Traverse up to find the appropriate container (p, div, column, or image-container)
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList.contains('column')) {
            // If we're in a column, apply alignment to the direct child of the column
            const childNode = range.commonAncestorContainer;
            if (childNode.nodeType === Node.TEXT_NODE) {
              applyAlignmentToNode(childNode.parentNode);
            } else {
              applyAlignmentToNode(childNode);
            }
            break;
          } else if (node.classList.contains('image-container')) {
            applyAlignmentToNode(node);
            break;
          } else if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)) {
            applyAlignmentToNode(node);
            break;
          }
        }
        node = node.parentNode;
      }
  
      // If we haven't found a suitable container, apply to the common ancestor container
      if (node === editorRef.current) {
        applyAlignmentToNode(range.commonAncestorContainer);
      }
  
      // Trigger change event
      onChange(editorRef.current.innerHTML);
    }
  };

  const applyFormatting = (format) => {
    if (format === 'underline') format = 'underline';
    else format = format.toLowerCase();
    document.execCommand(format);
    onChange(editorRef.current.innerHTML);
  };

  const applyHeading = (heading) => {
    document.execCommand('formatBlock', false, heading);
    onChange(editorRef.current.innerHTML);
    setDropdownVisible(false);
  };

  const removeHeadingTags = () => {
    document.execCommand('formatBlock', false, 'P');
    onChange(editorRef.current.innerHTML);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
  
      const selection = window.getSelection();
      if (selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const currentNode = range.startContainer;
  
      // Function to create a new paragraph with reset formatting
      const createNewParagraph = () => {
        const newParagraph = document.createElement('p');
        newParagraph.style.textAlign = 'left';
        newParagraph.style.fontWeight = 'normal';
        newParagraph.style.fontStyle = 'normal';
        newParagraph.style.textDecoration = 'none';
        newParagraph.appendChild(document.createElement('br'));
        return newParagraph;
      };
  
      // Function to insert a new paragraph and set cursor
      const insertNewParagraph = (newParagraph, referenceNode, insertAfter = true) => {
        if (insertAfter) {
          if (referenceNode.nextSibling) {
            referenceNode.parentNode.insertBefore(newParagraph, referenceNode.nextSibling);
          } else {
            referenceNode.parentNode.appendChild(newParagraph);
          }
        } else {
          referenceNode.parentNode.insertBefore(newParagraph, referenceNode);
        }
        range.setStart(newParagraph, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      };
  
      // Check if inside the editor
      let isInsideEditor = false;
      let node = currentNode;
      while (node) {
        if (node === editorRef.current) {
          isInsideEditor = true;
          break;
        }
        node = node.parentNode;
      }
  
      if (!isInsideEditor) {
        console.warn('Cursor is outside the editor');
        return;
      }
  
      // Check if inside a list item, image container, or heading
      node = currentNode;
      let specialContainer = null;
      while (node && node !== editorRef.current) {
        if (node.nodeName === 'LI' || 
            (node.classList && node.classList.contains('image-container')) ||
            /^H[1-6]$/i.test(node.nodeName)) {
          specialContainer = node;
          break;
        }
        node = node.parentNode;
      }
  
      if (specialContainer) {
        const newParagraph = createNewParagraph();
        insertNewParagraph(newParagraph, specialContainer);
      } else {
        if (isColumnMode) {
          let currentColumn = null;
          node = range.startContainer;
  
          // Find the current column
          while (node && node !== editorRef.current) {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('column')) {
              currentColumn = node;
              break;
            }
            node = node.parentNode;
          }
  
          if (!currentColumn) {
            // If not in a column, find the last column
            const columns = editorRef.current.querySelectorAll('.column');
            currentColumn = columns[columns.length - 1];
          }
  
          const newParagraph = createNewParagraph();
  
          // Find the nearest block-level parent within the column
          let blockParent = range.startContainer;
          while (blockParent && blockParent !== currentColumn && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(blockParent.nodeName)) {
            blockParent = blockParent.parentNode;
          }
  
          if (blockParent && blockParent !== currentColumn) {
            insertNewParagraph(newParagraph, blockParent);
          } else {
            currentColumn.appendChild(newParagraph);
            range.setStart(newParagraph, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        } else {
          // Non-column mode
          const newParagraph = createNewParagraph();
          
          // Find the nearest block-level parent
          let blockParent = range.startContainer;
          while (blockParent && blockParent !== editorRef.current && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(blockParent.nodeName)) {
            blockParent = blockParent.parentNode;
          }
  
          if (blockParent && blockParent !== editorRef.current) {
            insertNewParagraph(newParagraph, blockParent);
          } else {
            // If we're at the root of the editor, append to the editor
            editorRef.current.appendChild(newParagraph);
            range.setStart(newParagraph, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
  
      // Reset text formatting
      document.execCommand('removeFormat');
  
      // Trigger change event
      onChange(editorRef.current.innerHTML);
    }
  };

  const makeImageResizable = (img) => {
    const resizableContainer = document.createElement('div');
    resizableContainer.classList.add('resizable-container');
    resizableContainer.style.position = 'relative';
    resizableContainer.style.display = 'inline-block';
    resizableContainer.style.width = img.width ? `${img.width}px` : 'auto';
    resizableContainer.style.height = img.height ? `${img.height}px` : 'auto';

    const resizer = document.createElement('div');
    resizer.classList.add('resizer');
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'blue';
    resizer.style.position = 'absolute';
    resizer.style.bottom = '0';
    resizer.style.right = '0';
    resizer.style.cursor = 'se-resize';

    // Move the image into the resizable container
    resizableContainer.appendChild(img);
    resizableContainer.appendChild(resizer);

    // Get the original aspect ratio of the image
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    const aspectRatio = originalWidth / originalHeight;

    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isResizing = true;

      const startX = e.clientX;
      const startWidth = img.offsetWidth;
      const parentElement = document.querySelector('.editor');

      const onMouseMove = (event) => {
        if (isResizing) {
          const dx = event.clientX - startX;
          const newWidth = startWidth + dx;
          const newHeight = newWidth / aspectRatio;

          // Get the dimensions of the parent element (the `.editor` div)
          const parentWidth = parentElement.offsetWidth;

          // Ensure the new dimensions do not exceed the parent container's size
          if (newWidth <= parentWidth && newWidth > 50) { // Minimum width to prevent disappearing
            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;
            resizableContainer.style.width = `${newWidth}px`;
            resizableContainer.style.height = `${newHeight}px`;
          }
        }
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // Trigger change event after resizing
        onChange(editorRef.current.innerHTML);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    return resizableContainer;
  };

  const insertImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
  
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
  
        // Custom image name
        const customImageName = prompt('Enter the name for the image (without extension):');
        if (!customImageName) {
          alert('Image name is required!');
          return;
        }
  
        // Custom alt text
        const customAltText = prompt('Enter the alt text for the image:');
        if (customAltText === null) {
          alert('Alt text is required!');
          return;
        }
  
        formData.append('file', file);
        formData.append('custom_name', customImageName);
  
        try {
          const response = await axios.post(uploadUrl, formData, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          });
  
          if (response.data.url) {
            const baseUrl = 'http://localhost:8000'; // Update base URL as needed
            const imageUrl = `${baseUrl}${response.data.url}`;
  
            // Load the image to get its natural dimensions
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              // Create the image element with natural dimensions
              const imgElement = document.createElement('img');
              imgElement.src = imageUrl;
              imgElement.alt = customAltText;
              imgElement.style.width = `${img.naturalWidth}px`;
              imgElement.style.height = `${img.naturalHeight}px`;
              imgElement.setAttribute('data-name', customImageName);
  
              // Create a container for the image
              const imgContainer = document.createElement('div');
              imgContainer.classList.add('image-container');
  
              // Call makeImageResizable here
              const resizableImgContainer = makeImageResizable(imgElement);
              imgContainer.appendChild(resizableImgContainer);
  
              // Get the current selection
              const selection = window.getSelection();
              if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents(); // Clear any selected text before inserting the image
  
                // Insert the image container at the current cursor position
                range.insertNode(imgContainer);
  
                // Move the selection to just after the newly inserted image
                range.setStartAfter(imgContainer);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
  
                // Trigger change event
                onChange(editorRef.current.innerHTML);
              } else {
                alert('Please place the cursor where you want to insert the image.');
              }
            };
          } else {
            alert('Image upload failed. No URL returned.');
          }
        } catch (error) {
          console.error(error);
          alert('Image upload failed. Please check the console for details.');
        }
      } else {
        alert('No file selected!');
      }
    };
  
    input.click(); // Open file picker
  };

  const insertLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        let existingLink = null;
        let node = range.startContainer;

        // Traverse up to find if the selected text is already a link
        while (node && node !== editorRef.current) {
          if (node.nodeName === 'A') {
            existingLink = node;
            break;
          }
          node = node.parentNode;
        }

        // Get the current URL if the selection is already a link
        const currentUrl = existingLink ? existingLink.href : '';

        // Save the current range to restore it after the modal is closed
        setSavedRange(range);

        // Open the link modal
        setCurrentLinkUrl(currentUrl);
        setLinkModalOpen(true);
      } else {
        alert('Please select some text to create or edit a link.');
      }
    }
  };

  const handleLinkSave = (url) => {
    if (savedRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);

      const range = savedRange;
      const selectedText = range.toString();

      if (selectedText) {
        let existingLink = null;
        let node = range.startContainer;

        // Traverse up to find if the selected text is already a link
        while (node && node !== editorRef.current) {
          if (node.nodeName === 'A') {
            existingLink = node;
            break;
          }
          node = node.parentNode;
        }

        if (url.trim() === '') {
          // If the URL is empty, remove the link
          if (existingLink) {
            const textNode = document.createTextNode(existingLink.textContent);
            existingLink.parentNode.replaceChild(textNode, existingLink);
          }
        } else {
          // Create or update the link
          let link;
          if (existingLink) {
            link = existingLink;
            link.href = url;
          } else {
            link = document.createElement('a');
            link.href = url;
            link.target = '_blank'; // Open link in a new tab
            link.textContent = selectedText; // Set the selected text as the link text

            // If it's a new link, insert it
            range.deleteContents(); // Clear the selected text
            range.insertNode(link); // Insert the link
          }

          // Move the selection to just after the newly inserted or updated link
          range.setStartAfter(link);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }

        // Trigger change event
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const insertYouTube = () => {
    setYouTubeModalOpen(true);
  };

  const handleYouTubeSave = (url) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      const iframe = document.createElement('iframe');
      iframe.width = '560';
      iframe.height = '315';
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Clear any selected text before inserting the video
        range.insertNode(iframe); // Insert the iframe

        // Move the selection to just after the newly inserted iframe
        range.setStartAfter(iframe);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        // Trigger change event
        onChange(editorRef.current.innerHTML);
      }
    } else {
      alert('Invalid YouTube URL. Please enter a valid URL.');
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleImageDoubleClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setCurrentImage(e.target);
      setImagePropertiesModalOpen(true);
    }
  };

  const handleImagePropertiesSave = ({ name, alt, width, height }) => {
    if (currentImage) {
      currentImage.setAttribute('data-name', name);
      currentImage.alt = alt;
      currentImage.style.width = `${width}px`;
      currentImage.style.height = `${height}px`;
  
      // Update the resizable container dimensions
      const resizableContainer = currentImage.parentElement;
      if (resizableContainer && resizableContainer.classList.contains('resizable-container')) {
        resizableContainer.style.width = `${width}px`;
        resizableContainer.style.height = `${height}px`;
      }
  
      // Trigger change event
      onChange(editorRef.current.innerHTML);
    }
  };

  const undo = () => {
    document.execCommand('undo');
    onChange(editorRef.current.innerHTML);
  };

  const redo = () => {
    document.execCommand('redo');
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        {/* Undo and Redo Buttons */}
        <button onClick={undo} style={{ fontSize: '18px' }} className="htmlbuttons">
          <LiaUndoSolid />
        </button>
        <button onClick={redo} style={{ fontSize: '18px' }} className="htmlbuttons">
          <LiaRedoSolid />
        </button>

        {/* Heading Dropdown */}
        <div className="dropdown">
          <button onClick={toggleDropdown} style={{ fontSize: '18px' }} className="headingbuttons">
            Headers
          </button>
          {dropdownVisible && (
            <div className="dropdown-content">
              <button
                onClick={() => applyHeading('h1')}
                style={{ fontSize: '20px' }}
                className="headingbuttons"
              >
                Heading 1
              </button>
              <button
                onClick={() => applyHeading('h2')}
                style={{ fontSize: '18px' }}
                className="headingbuttons"
              >
                Heading 2
              </button>
              <button
                onClick={() => applyHeading('h3')}
                style={{ fontSize: '16px' }}
                className="headingbuttons"
              >
                Heading 3
              </button>
              <button
                onClick={() => applyHeading('h4')}
                style={{ fontSize: '15px' }}
                className="headingbuttons"
              >
                Heading 4
              </button>
              <button onClick={removeHeadingTags} className="headingbuttons">
                Text
              </button>
            </div>
          )}
        </div>

        {/* Inline Formatting Buttons */}
        <button
          onClick={() => applyFormatting('bold')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaBold />
        </button>
        <button
          onClick={() => applyFormatting('italic')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => applyFormatting('underline')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaUnderline />
        </button>

        {/* Image and Link Buttons */}
        <button onClick={insertImage} style={{ fontSize: '18px' }} className="htmlbuttons">
          <MdImage />
        </button>
        <button onClick={insertLink} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaLink />
        </button>

        {/* YouTube Embed Button */}
        <button onClick={insertYouTube} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaYoutube />
        </button>

        {/* List Buttons */}
        <button
          onClick={() => {
            document.execCommand('insertUnorderedList');
            onChange(editorRef.current.innerHTML);
          }}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <PiListBulletsBold />
        </button>
        <button
          onClick={() => {
            document.execCommand('insertOrderedList');
            onChange(editorRef.current.innerHTML);
          }}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <MdOutlineFormatListNumbered />
        </button>

        {/* Text Alignment Buttons */}
        <button
          onClick={() => applyAlignment('Left')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => applyAlignment('Center')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => applyAlignment('Right')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => applyAlignment('Full')}
          style={{ fontSize: '18px' }}
          className="htmlbuttons"
        >
          <FaAlignJustify />
        </button>
        <button 
            onClick={toggleColumnMode} 
            style={{ 
              fontSize: '18px', 
              backgroundColor: isColumnMode ? '#FFA500' : 'white' 
            }} 
            className="htmlbuttons">
            <FaTableColumns />
        </button>
      </div>
      <div
        className="editor"
        contentEditable
        ref={editorRef}
        onInput={() => onChange(editorRef.current.innerHTML)}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleImageDoubleClick}
      />
      <LinkModal
        isOpen={isLinkModalOpen}
        currentUrl={currentLinkUrl}
        onSave={handleLinkSave}
        onClose={() => setLinkModalOpen(false)}
      />
      <YouTubeModal
        isOpen={isYouTubeModalOpen}
        onSave={handleYouTubeSave}
        onClose={() => setYouTubeModalOpen(false)}
      />
      <ImagePropertiesModal
        isOpen={isImagePropertiesModalOpen}
        image={currentImage}
        onSave={handleImagePropertiesSave}
        onClose={() => setImagePropertiesModalOpen(false)}
      />
    </div>
  );
};

export default CustomHtmlEditor;