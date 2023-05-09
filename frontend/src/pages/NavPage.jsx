import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import icons from "../style/icons/icons";

const NavBox = styled.nav`
    margin-top: 2rem;

    .nav_link {
        display: block;
        width: 100%;
        height: 2.4rem;
        position: relative;
        margin: ${({ fold }) =>
            fold ? "12px 20px" : "0.2rem 0.8rem 0.2em 1.4rem"};

        .nav_contents {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.8em;
            display: ${({ fold }) => (fold ? "flex" : "block")};

            .nav_icon {
                height: 100%;
                font-size: ${({ fold }) => (fold ? "2em" : " 1.1em")};
                vertical-align: middle;
                transition: all 0.05s;
            }

            .nav_text {
                display: ${({ fold }) => (fold ? "none" : "inline-block")};
                vertical-align: middle;
                padding-left: 0.5em;
            }
        }
    }

    .nav_link.active {
        position: relative;

        .nav_icon {
            color: ${({ theme }) => theme.color.main};

            svg {
                stroke-width: 1.2px;
            }
        }

        .nav_text {
            color: ${({ theme }) => theme.color.main};
            font-weight: 700;
        }

        &::before {
            content: "";
            position: absolute;
            background-color: ${({ theme }) => theme.color.main};
            left: -9.1%;
            width: ${({ fold }) => (fold ? "0px" : "12px")};
            height: 100%;
        }
    }
`;

function NavPage({ fold }) {
    const location = useLocation();
    const PATH_NAME = location.pathname;

    return (
        <NavBox fold={fold}>
            <Link
                to="/"
                className={PATH_NAME === "/" ? "nav_link active" : "nav_link "}
            >
                <div className="nav_contents">
                    <span className="nav_icon">{icons.boardIcon}</span>
                    <span className="nav_text">보드</span>
                </div>
            </Link>
            <Link
                to="/dashboard"
                className={
                    PATH_NAME === "/dashboard" ? "nav_link active" : "nav_link "
                }
            >
                <div className="nav_contents">
                    <span className="nav_icon">{icons.dashboardIcon}</span>
                    <span className="nav_text">대쉬보드</span>
                </div>
            </Link>
            <Link
                to="/calendar"
                className={
                    PATH_NAME === "/calendar" ? "nav_link active" : "nav_link "
                }
            >
                <div className="nav_contents">
                    <span className="nav_icon">{icons.calendarIcon}</span>
                    <span className="nav_text">캘린더</span>
                </div>
            </Link>
        </NavBox>
    );
}

export default NavPage;
