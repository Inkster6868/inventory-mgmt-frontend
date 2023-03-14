import React from 'react'
import { SiMastodon } from "react-icons/si";
import { Link } from 'react-router-dom';
import "../home/Home.scss";
import heroImg from "../../assets/inv-img.png"
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';

const Home = () => {
    return (
        <div className='home'>
            <nav className='container --flex-between'>
                <div className='logo'>
                    <SiMastodon size={35} />
                </div>
                <ul className='home-links'>
                {/* display register and login links to the user who is logged out not to the one who is logged in */}
                <ShowOnLogout> 
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ShowOnLogout>
                <ShowOnLogout> 
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                </ShowOnLogout>
                <ShowOnLogin> 
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/dashboard">Dashboard</Link>
                        </button>
                    </li>
                </ShowOnLogin>
                </ul>
            </nav>
            {/* HERO SECTION */}
            <section className="container hero">
                <div className="hero-text">
                    <h2>Streamlining Stock: A Comprehensive Inventory Management Solution</h2>
                    <p>Efficient inventory management is crucial for any business, and our solution provides the tools and insights you need to stay on top of your inventory and make better decisions </p>

                    <div className="hero-buttons">
                        <button className="--btn --btn-secondary">
                            <Link to="/login">Free Trial for 1 Month</Link>
                        </button>
                    </div>
                    <div className="--flex-start">
                        <NumberText num="1" text="Brand Owners" />
                        <NumberText num="50" text="Active Users " />
                        <NumberText num="0" text="Partners" />
                    </div>
                </div>


                <div className="hero-image">
                    <img src={heroImg} alt="Inventory" />
                </div>
            </section>
        </div>
    )
}


const NumberText = ({ num, text }) => {
    return (
        <div className="--mr">
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home
