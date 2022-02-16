import React, { useState, useEffect } from "react";
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

const header_for_not_login = [
  {
    name: "스터디 목록",
    url: "studylist",
  },
];

const header_for_login = [
  {
    name: "내 스터디",
    url: "mystudy",
  },
  {
    name: "스터디 목록",
    url: "studylist",
  },
  {
    name: "스터디 만들기",
    url: "create",
  },
];

const route_pages = {
  mystudy: "내 스터디",
  studylist: "스터디 목록",
  create: "스터디 만들기",
};

const user_pages = [
  {
    name: "회원정보수정",
    url: "/mypage/update",
  },
  {
    name: "대시보드",
    url: "/mypage/dashboard",
  },
  {
    name: "회원탈퇴",
    url: "/mypage/withdrawal",
  },
  {
    name: "로그아웃",
    url: "/",
  },
];

const flex_pages_login = [
  {
    name: "회원정보수정",
    url: "/mypage/update",
  },
  {
    name: "대시보드",
    url: "/mypage/dashboard",
  },
  {
    name: "회원탈퇴",
    url: "/mypage/withdrawal",
  },
  {
    name: "내 스터디",
    url: "mystudy",
  },
  {
    name: "스터디 목록",
    url: "studylist",
  },
  {
    name: "스터디 만들기",
    url: "create",
  },
  {
    name: "로그아웃",
    url: "/",
  },
];

const flex_pages_not_login = [
  {
    name: "로그인",
    url: "login",
  },
  {
    name: "회원가입",
    login: "signup",
  },
  {
    name: "스터디 목록",
    url: "studylist",
  },
];

const ResponsiveAppBar = () => {
  useEffect(() => {
    const setHeaderItems = () => {
      if (localStorage.getItem("isLogin") === "true") {
        setHeaderItem([...header_for_login]);
      } else {
        setHeaderItem([...header_for_not_login]);
      }
    };

    setHeaderItems();
  }, []);

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
  const [headerItem, setHeaderItem] = useState([]);

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
    update: "회원정보수정",
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
        {["update", "dashboard", "withdrawal"].map((text, index) => (
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

  let flexItem;

  if (localStorage.getItem("isLogin")) {
    item = (
      <>
        <Tooltip title="내 정보">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={localStorage.getItem("profile_img")}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {user_pages.map((page, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (page.name === "로그아웃") {
                  localStorage.clear();
                }
                window.location.href = page.url;
              }}
            >
              <Typography textAlign="center" variant="subtitle1">
                {page.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );

    flexItem = (
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
        {flex_pages_login.map((page, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (page.name === "로그아웃") {
                localStorage.clear();
              }
              window.location.href = page.url;
            }}
          >
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
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

    flexItem = (
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
        {flex_pages_not_login.map((page, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              window.location.href = page.url;
            }}
          >
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
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
            <Button
              size="large"
              onClick={() => (window.location.href = "/")}
              sx={{
                color: "white",
                textTransform: "none",
                fontSize: 25,
                display: { xs: "none", md: "flex" },
              }}
            >
              Stu.Delivery
            </Button>

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
              <>{flexItem}</>
              <Button
                size="large"
                onClick={() => (window.location.href = "/")}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: 25,
                  display: { xs: "flex", md: "none" },
                }}
              >
                Stu.Delivery
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {headerItem.map((item, index) => (
                <Button
                  href={item.url}
                  key={index}
                  component={Link}
                  to={item.url}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.name}
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
