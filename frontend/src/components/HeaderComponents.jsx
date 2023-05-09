import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// COMPONENT
import NavPage from "../pages/NavPage";

import icons from "../style/icons/icons";

const HeaderBox = styled.header`
    height: 100vh;
    width: ${({ fold }) => (fold ? "9rem" : "18rem")};
    min-width: ${({ fold }) => (fold ? "9rem" : "18rem")};
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    position: relative;
    transition: width 0.35s;

    .logo_link {
        display: block;
        margin: 10px 0 0 0;

        .logo {
            font-size: ${({ fold }) => (fold ? "1.5em" : "2em")};
            font-weight: 900;
            color: ${({ theme }) => theme.color.main};
            margin: 3rem 0 1rem 2.2rem;
            transition: font-size 0.35s;
        }
    }
`;

const FoldIcon = styled.div`
    position: absolute;
    top: 0.8%;
    right: 3%;
    color: ${({ theme }) => theme.color.grey};
    font-size: 1.6rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.color.neonGreen};
    }
`;

function HeaderComponents() {
    const [fold, setFold] = useState(false);

    const handleFoldEvent = () => {
        setFold((prev) => !prev);
    };

    return (
        <HeaderBox fold={fold}>
            <FoldIcon onClick={handleFoldEvent}>
                {fold ? icons.folderOpenIcon : icons.folderCloseIcon}
            </FoldIcon>
            <Link to="/" className="logo_link">
                <p className="logo">LOGO</p>
            </Link>
            <NavPage fold={fold} />
        </HeaderBox>
    );
}

export default HeaderComponents;
