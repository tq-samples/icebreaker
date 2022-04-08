import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, Grid, IconButton, TextField, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import shuffle from "lodash.shuffle";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const talkTitles = [
  "最近嬉しかったこと",
  "最近買ったモノ",
  "最近見たYoutube動画",
  "最近の趣味",
  "今一番欲しいもの",
  "週末に出かけた場所",
  "昨日の夜ご飯",
  "好きな漫画・アニメ",
  "小学校の頃の夢",
  "出身地について",
];

export default function CenteredTabsPage() {
  const [value, setValue] = useState("1");
  const [userName, setUserName] = useState("");
  const [personList, setPersonList] = useState<string[]>([]);
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");
  const [shuffledUser, setShuffledUser] = useState("");
  const [shuffledTitle, setShuffledTitle] = useState("");

  const [checked, setChecked] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [clock, setClock] = useState(Math.random);

  //functions
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePersonAddEvent = () => {
    if (userName === "") {
      setInputError(true);
      setInputErrorText("入力必須です");
      return;
    } else if (personList.findIndex((name) => name === userName) !== -1) {
      setInputError(true);
      setInputErrorText("同じ名前が存在します");
      return;
    }
    setPersonList([...personList, userName]);
    setUserName("");
    setInputError(false);
    setInputErrorText("");
  };

  const handleDeletePerson = (index: number) => {
    const newPersonList = [...personList];
    newPersonList.splice(index, 1);
    setPersonList(newPersonList);
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleStop = () => {
    setConfetti(true);
    setIsStarted(false);
  };
  const handleGo = async () => {
    if (personList.length === 0) {
      alert("参加者がいません");
      return;
    } else if (checked.length === 0) {
      alert("トークテーマが選択されていません");
      return;
    }
    setConfetti(false);
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(() => {
        setClock(Math.random());
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStarted]);

  useEffect(() => {
    setShuffledUser(shuffle(personList)[0]);
    setShuffledTitle(talkTitles[shuffle(checked)[0]]);
  }, [clock]);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab value="1" label="参加者" />
            <Tab value="2" label="トークテーマ" />
            <Tab value="3" label="シャッフル" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="inputPerson"
                  label="参加者"
                  variant="outlined"
                  value={userName}
                  onChange={handleUserNameChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.keyCode === 13) {
                      handlePersonAddEvent();
                    }
                  }}
                  error={inputError}
                  inputRef={inputRef}
                  helperText={inputErrorText}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        size="large"
                        edge="start"
                        onClick={handlePersonAddEvent}
                      >
                        <PersonAddAlt1Icon />
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <List>
                {personList.map((value, i) => {
                  return (
                    <ListItem
                      key={value}
                      divider={true}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePerson(i)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={value}
                        primaryTypographyProps={{
                          width: "160px",
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12}>
              <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {talkTitles.map((value, index) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(index) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12}>
              {isStarted ? (
                <Button variant="contained" onClick={handleStop}>
                  Stop
                </Button>
              ) : (
                <Button variant="contained" onClick={handleGo}>
                  Go
                </Button>
              )}
            </Grid>
            <Box mt={10} />
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom component="div">
                {shuffledUser} さん
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom component="div">
                の
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom component="div">
                {shuffledTitle}
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
      {confetti && <Confetti width={width} height={height} recycle={false} />}
    </Box>
  );
}
