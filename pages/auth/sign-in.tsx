import Image from "next/image";
import PureBlock from "../../component/pureBlock";

export default function signIn() {
    return (
        <>
            <PureBlock flow={true}>
                <div>
                    <Image src='/logo.svg' width={136} height={16}/>
                </div>
                <div>
                    <span className="header">Login</span>
                </div>
                <div>
                    <span className="message">
                        Enter your mobile number to secure your access
                    </span>
                </div>
                <div className='inputGroup'>
                    <span>
                        Phone number <em>*</em>
                    </span>
                    <input type="text"/>
                    <button className='button inputGroup__button'>
                        Next
                    </button>
                </div>
            </PureBlock>
        </>
    )
}
