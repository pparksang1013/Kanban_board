import styled from "styled-components";
import { Link } from "react-router-dom";

// COMPONENT
import NavPage from "../pages/NavPage";

import icons from "../style/icons/icons";

const HeaderBox = styled.header`
    height: 100vh;
    width: 18rem;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    position: relative;

    .folder_icon {
        position: absolute;
        top: 0.5%;
        right: 2%;
        color: ${({ theme }) => theme.color.grey};
        font-size: 1.8rem;
        cursor: pointer;
    }

    .logo_link {
        display: block;
        margin: 10px 0 0 0;

        .logo {
            font-size: 2rem;
            font-weight: 900;
            color: ${({ theme }) => theme.color.main};
            margin: 1.4rem 0 1rem 2.2rem;
            /* border-bottom: 0.1em solid ${({ theme }) => theme.color.main}; */
        }
    }
`;

function HeaderComponents() {
    return (
        <HeaderBox>
            {icons.folderIcon}
            <Link to="/" className="logo_link">
                <p className="logo">LOGO</p>
            </Link>
            <NavPage />
        </HeaderBox>
    );
}

export default HeaderComponents;
