import { FhirInputMarkdownRendererProps } from "@bonfhir/ui/r5";
import { Input, InputWrapperProps } from "@mantine/core";
import {
  Link,
  RichTextEditor,
  RichTextEditorProps,
  RichTextEditorToolbarProps,
} from "@mantine/tiptap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement, ReactNode, useEffect } from "react";
import { Markdown } from "tiptap-markdown";

export function MantineFhirInputMarkdown(
  props: FhirInputMarkdownRendererProps<MantineFhirInputMarkdownProps>,
): ReactElement | null {
  const editor: Editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Markdown.configure({
        html: false,
      }),
    ],
    onUpdate: ({ editor }: { editor: Editor }) => {
      console.log(
        "onChange",
        editor.storage.markdown.getMarkdown() || undefined,
      );
      props.onChange?.(editor.storage.markdown.getMarkdown() || undefined);
    },
  });

  useEffect(() => {
    if (
      editor &&
      (props.value || "") !== editor.storage.markdown.getMarkdown()
    ) {
      editor.commands.setContent(props.value || "");
    }
  }, [editor, props.value]);

  return (
    <Input.Wrapper
      label={props.label}
      description={props.description}
      error={props.error}
      required={props.required}
      {...props.rendererProps?.wrapper}
    >
      <RichTextEditor editor={editor} {...props.rendererProps?.richTextEditor}>
        <RichTextEditor.Toolbar
          sticky
          stickyOffset={60}
          {...props.rendererProps?.richTextEditorToolbar}
        >
          {props.rendererProps?.toolbarChildren ?? (
            <>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>
            </>
          )}
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
}

export interface MantineFhirInputMarkdownProps {
  wrapper?: Omit<InputWrapperProps, "children"> | null | undefined;
  richTextEditor?: RichTextEditorProps | null | undefined;
  richTextEditorToolbar?: RichTextEditorToolbarProps | null | undefined;
  toolbarChildren?: ReactNode | null | undefined;
}
