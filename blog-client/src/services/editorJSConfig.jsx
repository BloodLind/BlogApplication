import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image';
const EditorConfig = {
        /**
         * Enable/Disable the read only mode
         */
        readOnly: false,
  
        /**
         * Wrapper of Editor
         */
        holder: 'editorjs',
  
        /**
         * Common Inline Toolbar settings
         * - if true (or not specified), the order from 'tool' property will be used
         * - if an array of tool names, this order will be used
         */
        // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
        // inlineToolbar: true,
  
        /**
         * Tools list
         */
        tools: {
          /**
           * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
           */
           image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
              }
            }
             },
          header: {
            class: Header,
            inlineToolbar: ['marker', 'link'],
            config: {
              placeholder: 'Header'
            },
            shortcut: 'CMD+SHIFT+H'
          },
  
        //   /**
        //    * Or pass class directly without any configuration
        //    */
        //   image: SimpleImage,
  
        //   list: {
        //     class: NestedList,
        //     inlineToolbar: true,
        //     shortcut: 'CMD+SHIFT+L'
        //   },
  
        //   checklist: {
        //     class: Checklist,
        //     inlineToolbar: true,
        //   },
  
        //   quote: {
        //     class: Quote,
        //     inlineToolbar: true,
        //     config: {
        //       quotePlaceholder: 'Enter a quote',
        //       captionPlaceholder: 'Quote\'s author',
        //     },
        //     shortcut: 'CMD+SHIFT+O'
        //   },
  
        //   warning: Warning,
  
        //   marker: {
        //     class:  Marker,
        //     shortcut: 'CMD+SHIFT+M'
        //   },
  
        //   code: {
        //     class:  CodeTool,
        //     shortcut: 'CMD+SHIFT+C'
        //   },
  
        //   delimiter: Delimiter,
  
        //   inlineCode: {
        //     class: InlineCode,
        //     shortcut: 'CMD+SHIFT+C'
        //   },
  
        //   linkTool: LinkTool,
  
        //   raw: RawTool,
  
        //   embed: Embed,
  
        //   table: {
        //     class: Table,
        //     inlineToolbar: true,
        //     shortcut: 'CMD+ALT+T'
        //   },
  
        },
  
        /**
         * This Tool will be used as default
         */
        // defaultBlock: 'paragraph',
  
        /**
         * Initial Editor data
         */
      
        // onReady: function(){
        //   saveButton.click();
        // },
        // onChange: function(api, event) {
        //   console.log('something changed', event);
        // },
      }



export default EditorConfig;