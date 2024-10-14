import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaBold,
  FaItalic,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaUnderline,
  FaAlignJustify,
  FaLink,
  FaYoutube,
  FaTableColumns,
} from 'react-icons/fa6';
import { MdImage, MdOutlineFormatListNumbered } from 'react-icons/md';
import { LiaUndoSolid, LiaRedoSolid } from 'react-icons/lia';
import { PiListBulletsBold } from 'react-icons/pi';
import './css/customHtmlEditor.css';
import LinkModal from './linkModal';
import YouTubeModal from './youtubeModal';
import ImagePropertiesModal from './imagePropertiesModal';

const CustomHtmlEditor = ({ onChange, uploadUrl, height }) => {
  const editorRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [currentLinkUrl, setCurrentLinkUrl] = useState('');
  const [savedRange, setSavedRange] = useState(null);
  const [isYouTubeModalOpen, setYouTubeModalOpen] = useState(false);
  const [isImagePropertiesModalOpen, setImagePropertiesModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isColumnMode, setIsColumnMode] = useState(false);

  // Initialize the editor content with a <p> tag when the component mounts
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML.trim() === '') {
      editorRef.current.innerHTML = '<p><br></p>';
      // Move the cursor inside the <p> tag
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(editorRef.current.firstChild, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  // Handle input events to wrap text in <p> tags if necessary
  const handleInput = () => {
    const editor = editorRef.current;
    if (editor) {
      // Check if there are direct text nodes
      let hasDirectTextNodes = false;
      for (const node of editor.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
          hasDirectTextNodes = true;
          break;
        }
      }

      if (hasDirectTextNodes || editor.innerHTML.trim() === '') {
        // Wrap all content in a <p>
        const content = editor.innerHTML;
        editor.innerHTML = `<p>${content}</p>`;
        // Move the cursor inside the <p> tag
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(editor.firstChild, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      onChange(editor.innerHTML);
    }
  };

  // Ensure the cursor is inside a <p> tag when the editor gains focus
  const handleFocus = () => {
    const editor = editorRef.current;
    if (editor.innerHTML.trim() === '') {
      editor.innerHTML = '<p><br></p>';
    }
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(editor.firstChild, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  // Toggle column mode
  const toggleColumns = () => {
    setIsColumnMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        // Activate column mode
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          let currentNode = range.startContainer;

          // Find the nearest block-level parent
          while (
            currentNode !== editorRef.current &&
            (currentNode.nodeType !== Node.ELEMENT_NODE ||
              !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(currentNode.nodeName))
          ) {
            currentNode = currentNode.parentNode;
          }

          // Ensure the content is wrapped in a paragraph if it's not already
          if (currentNode === editorRef.current) {
            const content = editorRef.current.innerHTML;
            editorRef.current.innerHTML = `<p>${content}</p>`;
            currentNode = editorRef.current.firstChild;
          }

          const columnContainer = document.createElement('div');
          columnContainer.classList.add('column-container');
          const column1 = document.createElement('div');
          column1.classList.add('column');
          const column2 = document.createElement('div');
          column2.classList.add('column');
          columnContainer.appendChild(column1);
          columnContainer.appendChild(column2);

          // Insert the column container after the current node
          if (currentNode.nextSibling) {
            editorRef.current.insertBefore(columnContainer, currentNode.nextSibling);
          } else {
            editorRef.current.appendChild(columnContainer);
          }

          // Move the cursor to the first column
          const newRange = document.createRange();
          newRange.setStart(column1, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      } else {
        // Deactivate column mode (additional logic can be added here if needed)
      }
      onChange(editorRef.current.innerHTML);
      return newMode;
    });
  };

  // Apply alignment to text or images
  const applyAlignment = (align) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let node = range.startContainer;
  
      // Traverse up to find the nearest element node
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the node is an image or a resizable container
          if (node.tagName === 'IMG' || node.classList.contains('resizable-container')) {
            node.style.display = 'block'; // Ensure the image is block-level for alignment
            
            // Reset margins
            node.style.marginLeft = '';
            node.style.marginRight = '';
            
            // Apply alignment
            if (align === 'left') {
              node.style.marginLeft = '0';
              node.style.marginRight = 'auto';
            } else if (align === 'right') {
              node.style.marginLeft = 'auto';
              node.style.marginRight = '0';
            } else if (align === 'center') {
              node.style.marginLeft = 'auto';
              node.style.marginRight = 'auto';
            }
            break;
          } else if (
            ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)
          ) {
            node.style.textAlign = align.toLowerCase();
            break;
          }
        }
        node = node.parentNode;
      }
  
      onChange(editorRef.current.innerHTML);
    }
  };

  // Apply formatting such as bold, italic, underline
  const applyFormatting = (format) => {
    document.execCommand(format.toLowerCase());
    onChange(editorRef.current.innerHTML);
  };

  // Apply heading formatting
  const applyHeading = (heading) => {
    document.execCommand('formatBlock', false, heading);
    onChange(editorRef.current.innerHTML);
    setDropdownVisible(false);
  };

  // Remove heading formatting
  const removeHeadingTags = () => {
    document.execCommand('formatBlock', false, 'P');
    onChange(editorRef.current.innerHTML);
  };

  // Toggle the dropdown menu for headings
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Handle keydown events, especially the Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const selection = window.getSelection();
      if (selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const currentNode = range.startContainer;

      const createNewParagraph = () => {
        const newParagraph = document.createElement('p');
        newParagraph.style.textAlign = 'left';
        newParagraph.style.fontWeight = 'normal';
        newParagraph.style.fontStyle = 'normal';
        newParagraph.style.textDecoration = 'none';
        newParagraph.appendChild(document.createElement('br'));
        return newParagraph;
      };

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

      let node = currentNode;
      let columnParent = null;
      if (isColumnMode) {
        while (node && node !== editorRef.current) {
          if (node.classList && node.classList.contains('column')) {
            columnParent = node;
            break;
          }
          node = node.parentNode;
        }
      }

      const newParagraph = createNewParagraph();

      if (columnParent) {
        columnParent.appendChild(newParagraph);
      } else {
        let blockParent = range.startContainer;
        while (
          blockParent &&
          blockParent !== editorRef.current &&
          !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(blockParent.nodeName)
        ) {
          blockParent = blockParent.parentNode;
        }

        if (blockParent && blockParent !== editorRef.current) {
          insertNewParagraph(newParagraph, blockParent);
        } else {
          editorRef.current.appendChild(newParagraph);
        }
      }

      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('removeFormat');
      onChange(editorRef.current.innerHTML);
    }
  };

  // Make images resizable
  const makeImageResizable = (img) => {
    const resizableContainer = document.createElement('div');
    resizableContainer.classList.add('resizable-container');
    resizableContainer.style.position = 'relative';
    resizableContainer.style.display = 'inline-block';

    const resizer = document.createElement('div');
    resizer.classList.add('resizer');
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'blue';
    resizer.style.position = 'absolute';
    resizer.style.bottom = '0';
    resizer.style.right = '0';
    resizer.style.cursor = 'se-resize';

    resizableContainer.appendChild(img);
    resizableContainer.appendChild(resizer);

    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    const aspectRatio = originalWidth / originalHeight;

    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isResizing = true;

      const startX = e.clientX;
      const startWidth = img.offsetWidth;
      const parentElement = editorRef.current;

      const onMouseMove = (event) => {
        if (isResizing) {
          const dx = event.clientX - startX;
          const newWidth = startWidth + dx;
          const newHeight = newWidth / aspectRatio;

          const parentWidth = parentElement.offsetWidth;

          if (newWidth <= parentWidth && newWidth > 50) {
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
        onChange(editorRef.current.innerHTML);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    return resizableContainer;
  };

  // Insert an image into the editor
  const insertImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();

        const customImageName = prompt('Enter the name for the image (without extension):');
        if (!customImageName) {
          alert('Image name is required!');
          return;
        }

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
              Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.data.url) {
            const baseUrl = 'http://localhost:8000';
            const imageUrl = `${baseUrl}${response.data.url}`;

            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              const imgElement = document.createElement('img');
              imgElement.src = imageUrl;
              imgElement.alt = customAltText;
              imgElement.style.width = `${img.naturalWidth}px`;
              imgElement.style.height = `${img.naturalHeight}px`;
              imgElement.setAttribute('data-name', customImageName);

              // Wrap the image in a block-level container
              const imgWrapper = document.createElement('div');
              imgWrapper.classList.add('image-wrapper');

              // Make the image resizable
              const resizableImgContainer = makeImageResizable(imgElement);
              imgWrapper.appendChild(resizableImgContainer);

              const selection = window.getSelection();
              if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(imgWrapper);
                range.setStartAfter(imgWrapper);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
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

    input.click();
  };

  // Insert a link into the editor
  const insertLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        let existingLink = null;
        let node = range.startContainer;

        while (node && node !== editorRef.current) {
          if (node.nodeName === 'A') {
            existingLink = node;
            break;
          }
          node = node.parentNode;
        }

        const currentUrl = existingLink ? existingLink.href : '';
        setSavedRange(range);
        setCurrentLinkUrl(currentUrl);
        setLinkModalOpen(true);
      } else {
        alert('Please select some text to create or edit a link.');
      }
    }
  };

  // Handle saving a link from the modal
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

        while (node && node !== editorRef.current) {
          if (node.nodeName === 'A') {
            existingLink = node;
            break;
          }
          node = node.parentNode;
        }

        if (url.trim() === '') {
          if (existingLink) {
            const textNode = document.createTextNode(existingLink.textContent);
            existingLink.parentNode.replaceChild(textNode, existingLink);
          }
        } else {
          let link;
          if (existingLink) {
            link = existingLink;
            link.href = url;
          } else {
            link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = selectedText;
            range.deleteContents();
            range.insertNode(link);
          }

          range.setStartAfter(link);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }

        onChange(editorRef.current.innerHTML);
      }
    }
  };

  // Open the YouTube modal to insert a video
  const insertYouTube = () => {
    setYouTubeModalOpen(true);
  };

  // Handle saving the YouTube video from the modal
  const handleYouTubeSave = (url) => {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      const iframe = document.createElement('iframe');
      iframe.width = '560';
      iframe.height = '315';
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = '0';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(iframe);
        range.setStartAfter(iframe);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        onChange(editorRef.current.innerHTML);
      }
    } else {
      alert('Invalid YouTube URL. Please enter a valid URL.');
    }
  };

  // Extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Handle double-click on images to open properties modal
  const handleImageDoubleClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setCurrentImage(e.target);
      setImagePropertiesModalOpen(true);
    }
  };

  // Handle saving image properties from the modal
  const handleImagePropertiesSave = ({ name, alt, width, height }) => {
    if (currentImage) {
      currentImage.setAttribute('data-name', name);
      currentImage.alt = alt;
      currentImage.style.width = `${width}px`;
      currentImage.style.height = `${height}px`;

      const resizableContainer = currentImage.closest('.resizable-container');
      if (resizableContainer) {
        resizableContainer.style.width = `${width}px`;
        resizableContainer.style.height = `${height}px`;
      }

      onChange(editorRef.current.innerHTML);
    }
  };

  // Undo the last action
  const undo = () => {
    document.execCommand('undo');
    onChange(editorRef.current.innerHTML);
  };

  // Redo the last undone action
  const redo = () => {
    document.execCommand('redo');
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={undo} style={{ fontSize: '18px' }} className="htmlbuttons">
          <LiaUndoSolid />
        </button>
        <button onClick={redo} style={{ fontSize: '18px' }} className="htmlbuttons">
          <LiaRedoSolid />
        </button>

        <div className="dropdown">
          <button onClick={toggleDropdown} style={{ fontSize: '18px' }} className="headingbuttons">
            Headers
          </button>
          {dropdownVisible && (
            <div className="dropdown-content">
              <button onClick={() => applyHeading('h1')} style={{ fontSize: '20px' }} className="headingbuttons">
                Heading 1
              </button>
              <button onClick={() => applyHeading('h2')} style={{ fontSize: '18px' }} className="headingbuttons">
                Heading 2
              </button>
              <button onClick={() => applyHeading('h3')} style={{ fontSize: '16px' }} className="headingbuttons">
                Heading 3
              </button>
              <button onClick={() => applyHeading('h4')} style={{ fontSize: '15px' }} className="headingbuttons">
                Heading 4
              </button>
              <button onClick={removeHeadingTags} className="headingbuttons">
                Text
              </button>
            </div>
          )}
        </div>

        <button onClick={() => applyFormatting('bold')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaBold />
        </button>
        <button onClick={() => applyFormatting('italic')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaItalic />
        </button>
        <button onClick={() => applyFormatting('underline')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaUnderline />
        </button>

        <button onClick={insertImage} style={{ fontSize: '18px' }} className="htmlbuttons">
          <MdImage />
        </button>
        <button onClick={insertLink} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaLink />
        </button>

        <button onClick={insertYouTube} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaYoutube />
        </button>

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

        <button onClick={() => applyAlignment('left')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaAlignLeft />
        </button>
        <button onClick={() => applyAlignment('center')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaAlignCenter />
        </button>
        <button onClick={() => applyAlignment('right')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaAlignRight />
        </button>
        <button onClick={() => applyAlignment('justify')} style={{ fontSize: '18px' }} className="htmlbuttons">
          <FaAlignJustify />
        </button>

        <button
          onClick={toggleColumns}
          style={{
            fontSize: '18px',
            backgroundColor: isColumnMode ? '#FFA500' : 'white',
          }}
          className="htmlbuttons"
        >
          <FaTableColumns />
        </button>
      </div>
      <div
        className="editor"
        contentEditable
        ref={editorRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleImageDoubleClick}
        onFocus={handleFocus}
        style={{ minHeight: height }}
      />
      {/* Modals */}
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