import React, { useEffect } from "react";
import { Editor as MCEEditor } from "@tinymce/tinymce-react";

const Editor = ({ height, initVal, type, onChange }) => {
    return (
        <MCEEditor
            apiKey="2lucpwmggdfrppkd6t2gy93xwyvpodd484ybkw0wzzbrmzox"
            initialValue={initVal}
            init={{
                height,
                //    width:'auto',
                menu: {
                    file: { title: "File", items: ["preview", "print"] },
                    view: {
                        title: "View",
                        items: ["preview", "fullscreen", "wordcount"],
                    },
                    tools: { title: "Tools", items: "" }, //remove
                },
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor ",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | bold italic image link| formatSelect | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",

                help_tabs: ["shortcuts", "keyboardnav"],
                branding: false,
            }}
            onEditorChange={(content, _) => onChange(content, type)}
        />
    );
};

export default Editor;
