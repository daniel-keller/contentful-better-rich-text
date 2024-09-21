# THIS IS NOT BEING MAINTAINED AND ONLY A PROOF OF CONCEPT.
## USE AT YOUR OWN RISK!!!
Feel free to fork the repo and add your own stuff. 
You can post issues and create PRs in this repo but its unlikely that I'll respond.

## Intro
This is a port of contentful's Rich Text Editor from https://github.com/contentful/field-editors

**Added features:**
The following changes are stored in the Plate/Slate JSON through new data properties
* Mark hyperlinks to open in a new tab - `element.data.newTab = true | false`
* Inline Assets that can float right or left - `element.data.float = 'left' | 'right'`
* Paragraphs and Headers can be aligned right, left, or center - `element.data.align = 'left' | 'right' | 'center' | undefined`

```
{
  "nodeType": "document",
  "data": {},
  "content": [
    {
      "nodeType": "paragraph",
      "data": {
        "align": "center"   // <==== New align property
      },
      "content": [
        {
          "nodeType": "text",
          "value": "Align Center",
          "marks": [],
          "data": {}
        }
      ]
    }
  ]
}
```

## TODO
* Add validation
* Add saving
* Add captions to Inline and Embedded Assets

## Setup
`yarn install` - Contentful's field editors have a some package conflicts that npm struggles to deal with. Yarn's package resolution manages it though.
`yarn dev` - run's local server. This app is setup to run in Contentful so you need to setup a contentful custom app.

To use in a content model create a field of type "JSON object" not "Rich Text" (the Rich Text field has built in validation that is incompatible with the new data properties added by this package). Contentful doesn't allow you to change the type of an existing field. If you want to use this on an existing content model you can add a new field of "JSON object" and copy paste your content from your old rich text field to this new field. The content should copy over cleanly.

Once your data is in contentful you will need to update your frontend renderer to look for the new data properties.
The INLINES type from contentful doesn't include the new inline asset so you will need to create your own ENUM to add it 
Assuming your using `@contentful/rich-text-react-renderer`:

```
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export declare enum INLINES {
    ASSET_HYPERLINK = "asset-hyperlink",
    EMBEDDED_ENTRY = "embedded-entry-inline",
    EMBEDDED_ASSET = "embedded-asset-inline",   // <=== new asset type
    EMBEDDED_RESOURCE = "embedded-resource-inline",
    ENTRY_HYPERLINK = "entry-hyperlink",
    HYPERLINK = "hyperlink",
    RESOURCE_HYPERLINK = "resource-hyperlink"
}

return documentToReactComponents(props.content, {
    renderNode: {      
      [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (        
        <a
           src={node.data.uri}
           target={node.data.newTab ? '_blank' : '_self'} // <=== link opens in new tab if newTab is truthy
        >{children}</a>
      ),

      ... account for other node types
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => (// use node.data.align to align text)
      [BLOCKS.HEADING1]: (node: any, children: ReactNode) => (// use node.data.align to align text)
      [BLOCKS.HEADING2]: (node: any, children: ReactNode) => (// use node.data.align to align text)
      [BLOCKS.HEADING3]: (node: any, children: ReactNode) => (// use node.data.align to align text)
      [BLOCKS.HEADING4]: (node: any, children: ReactNode) => (// use node.data.align to align text)
      [BLOCKS.HEADING5]: (node: any, children: ReactNode) => (// use node.data.align to align text)
      [BLOCKS.HEADING6]: (node: any, children: ReactNode) => (// use node.data.align to align text)

      [INLINE.EMBEDDED_ASSET]: (node: any, children: ReactNode) => (// use node.data.float to float asset left or right)
    },
  });

```
## Known issues
* No app configuration yet so you can't enable/disable rich text features like you can with the default one.
* floating assets can stack in the editor if they are too close to each other.
* dragging floating assets around leaves empty paragraphs behind.
* No idea how well the align text feature will work along side RTL languages like Hebrew or Arabic.
* Changing the Heading/Paragraph format undoes the alignment. Alignment needs to then be reselected.

## One more thing
Contentful's rich text field editor is built on a super outdated version of PlateJS (v30) which contains security vulnerabilities. This package doesn't correct that and is built on the same version of PlateJS. Maybe Contentful will fix this some day? I doubt it since they are investing most dev time into Contentful Studio (which I suspect is waaaay too expensive for most users).

