import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import icons from "../style/icons/icons";

const NavBox = styled.nav`
    width: 280px;
    min-height: 280px;
    margin-top: 2rem;

    .nav_link {
        display: block;
        height: 2.4rem;
        position: relative;
        margin: 0.2rem 0.8rem 0.2em 1.4rem;

        .nav_contents {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.8em;

            .nav_icon {
                display: inline-block;
                height: 100%;
                font-size: 1.1em;
                vertical-align: middle;
                padding-top: 0.16em;
            }

            .nav_text {
                display: inline-block;
                height: 100%;
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
            display: fixed;
            position: absolute;
            background-color: ${({ theme }) => theme.color.main};
            left: -9.1%;
            width: 12px;
            height: 100%;
        }
    }
`;

function NavPage() {
    const location = useLocation();
    const PATH_NAME = location.pathname;

    return (
        <NavBox>
            <Link
                to="/kanbanboard"
                className={
                    PATH_NAME === "/" || PATH_NAME === "/kanbanboard"
                        ? "nav_link active"
                        : "nav_link "
                }
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
