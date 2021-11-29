import Image from "next/image";
import Modal from "../../../utils/Modal";
import Card from "../../../utils/Card";

export default function KitNumberModal(props: { visibility?: boolean, closeModal?: any}) {

    return (
        <Modal>
            <Card>
                <button
                    onClick={() => props.closeModal(!props.visibility)}
                    className='button card__close'
                >
                    <Image src="/cross.svg" width={24} height={24} alt="close"/>
                </button>
                <div className='card__media card__media_with-bg'>
                    <Image src="/kit-number-preview.svg" width={51} height={51} alt="Kit Number"/>
                </div>
                <div className='card__content'>
                    <h4 className='card__content-title'>Locate Kit Number</h4>
                    <p className='card__content-message'>To find your kit number, please look at the card in your kit that says “Test Kit Number”.</p>
                </div>
                <button className='button card__button'>
                    Ok
                </button>
            </Card>
        </Modal>
    )
}
