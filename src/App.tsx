import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import {
  ActionRequest,
  AudioActionResponse,
  ChatController,
  FileActionResponse,
  MuiChat,
} from 'chat-ui-react';
import React from 'react';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
    },
  },
});

export function App(): React.ReactElement {
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    }),
  );

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ height: '100%', backgroundColor: 'gray' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            bgcolor: 'background.default',
          }}
        >
          <Typography sx={{ p: 1 }}>
            Welcome to{' '}
            <Link href="https://github.com/twihike/chat-ui-react">
              chat-ui-react
            </Link>{' '}
            demo site.
          </Typography>
          <Divider />
          <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
            <MuiChat chatController={chatCtl} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

async function echo(chatCtl: ChatController): Promise<void> {
  await chatCtl.addMessage({
    type: 'text',
    content: `Please enter something.`,
    self: false,
    avatar: '-',
  });
  const text = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: 'Please enter something',
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `You have entered:\n${text.value}`,
    self: false,
    avatar: '-',
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your gender?`,
    self: false,
    avatar: '-',
  });
  

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your favorite fruit?`,
    self: false,
    avatar: '-',
  });
  

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your favorite picture?`,
    self: false,
    avatar: '-',
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `Please enter your voice.`,
    self: false,
    avatar: '-',
  });
  

  await chatCtl.addMessage({
    type: 'text',
    content: `Please press the button.`,
    self: false,
    avatar: '-',
  });
  const good = await chatCtl.setActionRequest({
    type: 'custom',
    Component: GoodInput,
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `You have pressed the ${good.value} button.`,
    self: false,
    avatar: '-',
  });

  echo(chatCtl);
}

function GoodInput({
  chatController,
  actionRequest,
}: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback((): void => {
    const res = { type: 'custom', value: 'Good!' };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Good!
      </Button>
    </div>
  );
}
