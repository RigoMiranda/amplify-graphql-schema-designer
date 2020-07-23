import React from "react";
import { Pre, Line, LineNo, LineContent } from "./PrismaCodeStyle";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";

/*
https://betterstack.dev/blog/code-highlighting-in-react-using-prismjs/
https://github.com/FormidableLabs/prism-react-renderer#advanced-props
https://prismjs.com/download.html#themes=prism-okaidia&languages=graphql&plugins=line-highlight

*/

const PrismaCode = props => {

    return (
        <Highlight 
            {...defaultProps}
                theme={theme} 
                code={props.code} 
                language="graphql"
            >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
                {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                    <LineNo>{i + 1}</LineNo>
                    <LineContent>
                    {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                    </LineContent>
                </Line>
                ))}
            </Pre>
            )}
        </Highlight>
    )
};

export default PrismaCode;
