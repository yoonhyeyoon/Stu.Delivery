import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const pages = ["mystudy", "studylist", "create"];
const route_pages = {
  mystudy: "내 스터디",
  studylist: "스터디 목록",
  create: "스터디 만들기",
};

const ResponsiveAppBar = () => {
  // 로그아웃
  const onLogout = () => {
    localStorage.clear();
    document.location.href = "/";
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [toggle, setToggle] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggle({ ...toggle, [anchor]: open });
  };

  const route_mypage = {
    "update/check": "회원정보수정",
    dashboard: "대시보드",
    withdrawal: "회원탈퇴",
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["update/check", "dashboard", "withdrawal"].map((text, index) => (
          <ListItem button key={text} component={Link} to={"mypage/" + text}>
            <ListItemText primary={route_mypage[text]} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let item;

  if (localStorage.getItem("isLogin")) {
    item = (
      <>
        <IconButton
          onClick={() => {
            window.location.href = "/mypage/update/check";
          }}
          sx={{ p: 0 }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
        <Button
          key="login"
          onClick={onLogout}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          로그아웃
        </Button>
      </>
    );
  } else {
    item = (
      <>
        <Button
          key="login"
          onClick={() => {
            window.location.href = "/login";
          }}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          로그인
        </Button>
        <Button
          key="signup"
          onClick={() => {
            window.location.href = "/signup";
          }}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          회원가입
        </Button>
      </>
    );
  }

  return (
    <>
      <AppBar
        position="static"
        style={{ background: "rgba(191, 122, 38, 0.7)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                {/* 로그인 했을때만 렌더링 */}
                {localStorage.getItem("isLogin") && (
                  <>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                      onClick={toggleDrawer(anchor, true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <nav>
                      <Drawer
                        anchor="left"
                        open={toggle["left"]}
                        onClose={toggleDrawer("left", false)}
                      >
                        {list("left")}
                      </Drawer>
                    </nav>
                  </>
                )}
              </React.Fragment>
            ))}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Stu.Delivery
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Stu.Delivery
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  href={page}
                  key={page}
                  component={Link}
                  to={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {route_pages[page]}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {item}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
