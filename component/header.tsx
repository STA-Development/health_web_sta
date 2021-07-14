import RapidIcon from "./base/icon/RapidIcon";
 const Header = ()=>{
    return (
        <div>
            <div className="test-wrapper">
                <RapidIcon/>
                   <div className="test-info">
                    <h3>  Inconclusive </h3>
                     <h5>Date: Dec 18, 2020 @ 11:59am</h5>
                </div>
            </div>
            <div className="user-info">
                <div className="first-row">
                    <p>FIRST NAME</p>
                    <h3>John</h3>
                    <p>LAST NAME</p>
                    <h3>Johnson</h3>
                </div>
                <div className="second-row">
                    <p>ADDRESS</p>
                    <h3>502 Alexandra Boulevard
                        Suite 5053
                        Toronto, ON
                        M4R 5T3</h3>
                    <div>
                        <div className="">
                            <p>Gender</p>
                            <h3>Male</h3>
                        </div>
                        <div className="">
                            <p>Phone</p>
                            <h3>(000)-000-0000</h3>
                        </div>
                    </div>
                    <div>
                        <div className="">
                            <p>country</p>
                            <h3>Canada</h3>
                        </div>
                        <div className="">
                            <p>OHIP</p>
                            <h3>000 000 000</h3>
                        </div>
                    </div>

                </div>
                <div className='third-row'>
                    <p>date of birth</p>
                    <h3>April 20, 1989</h3>
                    <p>passport no.</p>
                    <h3>ZE000059</h3>
                    <p>issuing country</p>
                    <h3>Canada</h3>
                </div>

            </div>

        </div>
    )
}
export default Header