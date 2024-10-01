import React, { useRef, useState } from 'react';
import axios from 'axios';
import { FaBold, FaItalic } from 'react-icons/fa6';
import { MdImage } from 'react-icons/md';
import { FaAlignLeft } from "react-icons/fa6";
import { FaAlignRight } from "react-icons/fa6";
import { FaAlignCenter } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa6";
import { FaAlignJustify } from "react-icons/fa6";
import { LiaUndoSolid } from "react-icons/lia";
import { PiListBulletsBold } from "react-icons/pi";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { LiaRedoSolid } from "react-icons/lia";
import { FaLink } from 'react-icons/fa6';
import './css/customHtmlEditor.css'; // Import a CSS file for styling

const CustomHtmlEditor = ({ onChange, uploadUrl }) => {
  const editorRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to apply text alignment
  const applyAlignment = (align) => {
    document.execCommand('justify' + align);
    onChange(editorRef.current.innerHTML);
  };

  const applyFormatting = (tag) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        const element = document.createElement(tag);
        element.textContent = selectedText;

        range.deleteContents(); // Clear the selected text
        range.insertNode(element); // Insert the new formatted element

        // Move the selection to just after the newly inserted element
        range.setStartAfter(element);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        // Trigger change event
        onChange(editorRef.current.innerHTML);
        setDropdownVisible(false);
      }
    }
  };

  const removeHeadingTags = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parent = range.startContainer.parentNode;

      if (parent.tagName.startsWith('H')) {
        const text = document.createTextNode(parent.textContent);
        parent.parentNode.replaceChild(text, parent);
      }

      // Trigger change event
      onChange(editorRef.current.innerHTML);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const newParagraph = document.createElement('p');
      newParagraph.appendChild(document.createElement('br')); // Add a line break

      const currentNode = range.startContainer;
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const parentElement = currentNode.parentNode;
        parentElement.parentNode.insertBefore(newParagraph, parentElement.nextSibling);
      } else {
        range.insertNode(newParagraph);
      }

      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      onChange(editorRef.current.innerHTML);
    }
  };

  const makeImageResizable = (img) => {
    const resizableContainer = document.createElement('div');
    resizableContainer.classList.add('resizable-container');
    resizableContainer.style.position = 'relative';
    resizableContainer.style.display = 'inline-block';
    resizableContainer.style.width = img.width + 'px';
    resizableContainer.style.height = img.height + 'px';

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
          if (newWidth <= parentWidth) {
            img.style.width = newWidth + 'px';
            img.style.height = newHeight + 'px';
            resizableContainer.style.width = newWidth + 'px';
            resizableContainer.style.height = newHeight + 'px';
          } else {
            img.style.width = parentWidth + 'px';
            img.style.height = (parentWidth / aspectRatio) + 'px';
            resizableContainer.style.width = parentWidth + 'px';
            resizableContainer.style.height = (parentWidth / aspectRatio) + 'px';
          }
        }
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
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
            const baseUrl = 'http://localhost:8000'; // Update base URL
            const imageUrl = `${baseUrl}${response.data.url}`;
  
            // Insert resizable image into editor
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = customImageName;
            img.style.width = '300px'; // Default width for inserted image
            img.style.height = 'auto'; // Default height (auto)
  
            const resizableImage = makeImageResizable(img);
  
            editorRef.current.focus();
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              range.deleteContents(); // Clear any selected text before inserting the image
              range.insertNode(resizableImage); // Insert the image at the cursor position
              
              // Move the selection to just after the newly inserted image
              range.setStartAfter(resizableImage);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
              onChange(editorRef.current.innerHTML);
            }
          }
        } catch (error) {
          console.error('Image upload failed:', error);
          alert('Image upload failed.');
        }
      }
    };
  
    input.click(); // Open file picker
  };
  

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
  
        if (selectedText) {
          // Create the link element
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank'; // Open link in a new tab
          link.textContent = selectedText; // Set the selected text as the link text
  
          // Clear the selected text and insert the link
          range.deleteContents(); // Clear selected text
          range.insertNode(link); // Insert the link
  
          // Move the selection to just after the newly inserted link
          range.setStartAfter(link);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
  
          // Trigger change event
          onChange(editorRef.current.innerHTML);
        } else {
          alert('Please select some text to create a link.');
        }
      }
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
      <button onClick={undo} style={{ fontSize: '18px' }} className='htmlbuttons'><LiaUndoSolid /></button>
      <button onClick={redo} style={{ fontSize: '18px' }} className='htmlbuttons'><LiaRedoSolid /></button>
        <div className="dropdown">
          <button onClick={toggleDropdown} style={{ fontSize: '18px' }} className='headingbuttons'>Headers</button>
          {dropdownVisible && (
            <div className="dropdown-content">
              <button onClick={() => applyFormatting('h1') } style={{ fontSize: '20px' }} className='headingbuttons'>Heading 1</button>
              <button onClick={() => applyFormatting('h2')} style={{ fontSize: '18px' }} className='headingbuttons'>Heading 2</button>
              <button onClick={() => applyFormatting('h3')} style={{ fontSize: '16px' }} className='headingbuttons'>Heading 3</button>
              <button onClick={() => applyFormatting('h4')} style={{ fontSize: '15px' }} className='headingbuttons'>Heading 4</button>
              <button onClick={removeHeadingTags} className='headingbuttons'>Text</button>
            </div>
          )}
        </div>
        <button onClick={() => applyFormatting('strong')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaBold /></button>
        <button onClick={() => applyFormatting('em')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaItalic /></button>
        <button onClick={() => applyFormatting('underline')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaUnderline /></button>
        <button onClick={insertImage} style={{ fontSize: '18px' }} className='htmlbuttons'><MdImage /></button>
        <button onClick={insertLink} style={{ fontSize: '18px' }} className='htmlbuttons'><FaLink /></button>

        <button onClick={() => document.execCommand('insertUnorderedList')} style={{ fontSize: '18px' }} className='htmlbuttons'><PiListBulletsBold /></button>
        <button onClick={() => document.execCommand('insertOrderedList')} style={{ fontSize: '18px' }} className='htmlbuttons'><MdOutlineFormatListNumbered /></button>
        
        {/* Text Alignment Buttons */}
        <button onClick={() => applyAlignment('Left')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaAlignLeft /></button>
        <button onClick={() => applyAlignment('Center')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaAlignCenter /></button>
        <button onClick={() => applyAlignment('Right')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaAlignRight /></button>
        <button onClick={() => applyAlignment('Justify')} style={{ fontSize: '18px' }} className='htmlbuttons'><FaAlignJustify /></button>
      </div>
      <div
        className="editor"
        contentEditable
        ref={editorRef}
        onInput={() => onChange(editorRef.current.innerHTML)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CustomHtmlEditor;
