'use client';

import ReactTwemoji from 'react-twemoji'

const Twemoji = (props: any) => {
    return (
        <>
            <ReactTwemoji options={{...props.options, base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'}}>
                {props.children}
            </ReactTwemoji>
        </>
    )
}

export default Twemoji