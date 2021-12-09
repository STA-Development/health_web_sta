import React from "react"
import Image from "next/image"

const SingleResultPreload = () => (
    <div className="single-result preload">
        <div style={{alignItems:"center"}} className="left">
            <div style={{marginLeft:0}} className="test-logo preload__style" />
            <div>
                <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-7" />
            </div>
        </div>
        <div className="right">
            <span className="answer result-status preload__style preload__lines preload__lines_md preload__lines_width-2" />
            <Image className="link-to-test" alt="next icon" src="/next.svg" width={16} height={16} />
        </div>
    </div>
)

export default SingleResultPreload
