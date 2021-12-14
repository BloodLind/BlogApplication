import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image';
import Marker from '@editorjs/marker'
import List from '@editorjs/list';
import RawTool from '@editorjs/raw'
import Table from '@editorjs/table';
import InlineCode  from '@editorjs/inline-code'
import Embed from '@editorjs/embed';
import { UploadPhoto,UploadPhotoByURL } from '../api/apiKeys';
const EditorConfig = {
        readOnly: false,
        placeholder: 'Let`s write an awesome story!',
        holderId: 'editorjs',
        minHeight: 150,
        tools: {  
           image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: UploadPhoto,
                byUrl: UploadPhotoByURL, 
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
        list: {
          class: List,
          inlineToolbar: true,
        },
          marker: {
            class:  Marker,
            shortcut: 'CMD+SHIFT+M'
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C'
          },
  
  
           raw: RawTool,
  
           embed: Embed,
  
          table: {
            class: Table,
            inlineToolbar: true,
            shortcut: 'CMD+ALT+T'
          },
  
        },
      }



export default EditorConfig;