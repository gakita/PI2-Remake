import "bootstrap-icons/font/bootstrap-icons.css"


function Footer(){
    return(
        <>
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="brand">
                        <h2>Cyras Airways</h2>
                        <p>Your journey starts here</p>
                    </div>
                    <div className="company-info">
                        <h2>Company</h2>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="support">
                        <h2>Support</h2>
                        <ul>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Terms of Use</a></li>
                        </ul>
                    </div>
                    <div className="socials">
                        <h2>Social Medias</h2>
                        <ul>
                            <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                            <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                            <li><a href="#"><i className="bi bi-instagram"></i></a></li>     
                        </ul>                  
                </div>
                </div>
                <div className="separator"></div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Cyras Airways. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer