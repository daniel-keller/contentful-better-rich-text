install using `cd rich-text; yarn install`
run `cd rich-text; yarn run start`

If you change slate node types you will need to re-build the valiation schema in `rich-text-types` then copy/paste the source into `rich-text/rich-text-types`. There are better ways to do this but we are understaffed and we'll cross that bridge after it collapses.

`cd rich-text-types; yarn install; yarn run generate-json-schema;`


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

# Setup
`yarn install` - Contentful's field editors have a some package conflicts that npm struggles to deal with. Yarn's package resolution manages it though.
`yarn dev` - run's local server. This app is setup to run in Contentful so you need to setup a contentful custom app.

! NOTE: the package.json action `upload-ci` isn't properly reading the contentful access variables from the .env right now. You will need to copy/paste them into the package.json command to get it to upload AND THEN REMOVE THEM BEFORE PUSHING CHANGES TO YOUR REPO! There's a fix for this out there but I haven't had time yet.

To use in a content model create a field of type "JSON object" not "Rich Text" (the Rich Text field has built in validation that is incompatible with the new data properties added by this package). Contentful doesn't allow you to change the type of an existing field. If you want to use this on an existing content model you can add a new field of "JSON object" and copy paste your content from your old rich text field to this new field. The content should copy over cleanly.

# Preserving Contentful sys link references
Contentful tracks the use of entries/assets across other fields EXCEPT JSON fields. To keep funcionality like seeing where entries/assets are used, warnings about nested entries/assets being unpublished when you try to publish parent records, and (I assume though haven't tested) Contentful's "Launch", you need to manually track the use of assets and entries in the RTE.

Upon saving, this custom RTE will iterate over all fields in the Entry, (all fields are checked so you can have more than one custom RTE fields in an Entry) check any JSON fields for sys links recursively, and record those links in one of two fields: `richTextReferencesAssets` (an optional many Assets field) and `richTextReferencesEntries` (an optional many References field).

Your entry model should look like this:

**MyCustomContentModel**
* OtherFieldInMyEntry = whatever
...
* MyCustomRTEContent = JSON field with better RTE field
* My2ndCustomRTEContentIfNeeded = JSON field with better RTE field
...
* richTextReferencesAssets = optional, many Assets field, hidden from editor
* richTextReferencesEntries = optional, many Assets field, hidden from editor

# Rendering on the frontend
Once your data is in contentful you will need to update your frontend renderer to look for the new data properties.
The `INLINES` type from contentful doesn't include the new inline asset so you will need to create your own enum to add it
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


# Adding new functionality
Adding a new editor functionality requres 3 steps
1. create plugin
1. create toolbar UI if needed
1. add node type
1. update validation schema

In version v38, PlateJS changed their syntax for adding plugins to be more object oriented. PlateJS [v36](https://v36.platejs.org/) is the documentation that aligns best with the version of PlateJS Contentful uses.

## Create a plugin
Add a new directory to `src/components/rich-text/plugins` and create a `createMyPlugin.ts` file. If your plugin requires an toolbar/dialog UI you can include it here as well.
Call your plugin setup function (`createMyPlugin()`) in `getPlugins` of `src/components/rich-text/plugins/index`.

## Update Toolbar
Import and render any new Toolbar components required for your plugin in `src/components/rich-text/Toolbar/index.ts`.

## Types extension
Contentful defines all rich text node types in 2 enums in `@contentful/rich-text-types`: `BLOCKS` or `INLINES`. Adding text alignment and an "open in new tab" option for hyperlinks didn't require new types but inline assets did. I added a new inline type "embedded-asset-inline". I couldn't find a good way to extend `INLINES` so I wrote a new one and updated all imports to reference it. If you add new node types you may have to do the same.

## Validation extension
If your modifications to the rich text editor includes adding or updating properties in the rich text json you will need to modify the data structure schema (`src/components/rich-text/schemas/generated` copied from copied from `@contentful/rich-text-types/dist/schemas`) so field validation passes. For example the text alignment plugin requires a new data property "align".

# Misc.
## Known issues with this repo
* No app configuration yet so you can't enable/disable rich text features like you can with the default one.
* floating assets can stack in the editor if they are too close to each other.
* No idea how well the align text feature will work along side RTL languages like Hebrew or Arabic.
* Changing the Heading/Paragraph format undoes the alignment. Alignment needs to then be reselected.

## One more thing
Contentful's rich text field editor is built on a super outdated version of PlateJS (v30) which contains security vulnerabilities. This package doesn't correct that and is built on the same version of PlateJS. Maybe Contentful will fix this some day? I doubt it since they are investing most dev time into Contentful Studio (which I suspect is waaaay too expensive for most users).
