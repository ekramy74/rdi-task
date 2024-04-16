import {
  AlertColor,
  Box,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import Spinner from "../../components/spinner/InnerSpinner";
import { useKateb } from "../../modules/echo/hooks/useKatebAPI";
import { useNateq } from "../../modules/echo/hooks/useNateqAPI";
import { useEffect, useRef, useState } from "react";
import ResponseMessage from "../../components/responseMessage/ResponseError";
import { getWaveBlob } from "webm-to-wav-converter";
import { AudioRecorder } from "react-audio-voice-recorder";
import { DragAndDropZone } from "../../components/dragNdropZone/DragAndDropZone";
import { ThemeSettings } from "../../theme/theme";

const HighlightedText = ({ highlightedText, before, after }: any) => {
  return (
    <p>
      {before}
      <span style={{ backgroundColor: "yellow" }}>{highlightedText}</span>
      {after}
    </p>
  );
};

type AlertState = {
  open: boolean;
  type: AlertColor;
  message: string;
};

function Echo() {
  const {
    nateqFn,
    isNateqLoading,
    isNateqSuccess,
    nateqRes,
    isNateqError,
    nateqError,
  } = useNateq();
  const {
    katebFn,
    isKatebLoading,
    isKatebSuccess,
    katebRes,
    isKatebError,
    katebError,
  } = useKateb();

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    type: "success",
    message: "",
  });
  const theme = ThemeSettings();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [audioText, setAudioText] = useState<string>("");
  const audioRef = useRef(null);
  const audioTextRef = useRef(null);
  const [highlightedText, setHighlightedText] = useState({
    before: "",
    highlightedText: "",
    after: "",
  });

  const urlSafeToRegularBase64 = (urlSafe: string) => {
    return urlSafe?.replace(/_/g, "/").replace(/-/g, "+") || "";
  };

  useEffect(() => {
    if (isKatebSuccess) {
      setAlertState({
        ...alertState,
        open: false,
      });
      const textRes = katebRes.data.json.words
        .map((item: any) => item.text)
        .join(" ");
      nateqFn({ text: textRes });
      setAudioText(textRes);
    }
  }, [isKatebSuccess, katebRes]);

  useEffect(() => {
    if (isKatebError || isNateqError) {
      setAlertState({
        open: true,
        type: "error",
        message:
          katebError?.response.data.description_en ||
          katebError?.message ||
          nateqError?.response.data.description_en ||
          nateqError?.message,
      });
    }
  }, [isKatebError, katebError, isNateqError, nateqError]);

  useEffect(() => {
    if (isNateqSuccess) {
      setAlertState({
        ...alertState,
        open: false,
      });
      const base64 = urlSafeToRegularBase64(nateqRes.data.wave);
      const audioUrl = `data:audio/wav;base64,${base64}`;
      if (audioRef.current) {
        (audioRef.current as HTMLAudioElement).src = audioUrl;
        (audioRef.current as HTMLAudioElement).play();
      }
    }
  }, [isNateqSuccess, nateqRes]);

  const onRecordCompelete = (blob: Blob) => {
    getWaveBlob(blob, true).then((waveBlob) => {
      const formData = new FormData();
      formData.append("file", waveBlob);
      katebFn(formData);
    });
  };

  const onUpload = (file: File) => {
    if (!file) return;
    if (file.type !== "audio/wav")
      return setAlertState({
        open: true,
        type: "error",
        message: "Please upload a valid wav file",
      });
    const formData = new FormData();
    formData.append("file", file);
    katebFn(formData);
  };

  const highlightText = (currentTime: any) => {
    let word = nateqRes.data.durations.find(
      (item: any) => currentTime >= item[1] && currentTime <= item[2]
    );

    if (word) {
      word = word[0];
      setHighlightedText({
        before: audioText.split(word)[0],
        highlightedText: word,
        after: audioText.split(word)[1],
      });
    }
  };

  const timeUpdate = (event: any) => {
    const minutes = Math.floor(event.target.currentTime / 60);
    const seconds = Math.floor(event.target.currentTime - minutes * 60);
    const milliseconds = Math.floor(event.target.currentTime * 1000) % 1000;
    const currentTime = parseFloat(`${seconds}.${milliseconds}`);
    highlightText(currentTime);
  };
  return (
    <PageContainer
      title='RDI - Echo service'
      description='This is the Echo page service'
    >
      {isKatebLoading || isNateqLoading ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {alertState.open && (
            <ResponseMessage
              message={alertState.message}
              type={alertState.type}
            />
          )}
          <Typography variant='h6' sx={{ marginTop: 2 }}>
            Welcome to ECHO service
          </Typography>
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: sm ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 10,
              rowGap: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant='body1' sx={{ marginTop: 2 }}>
                Record in Arabic please
              </Typography>
              <AudioRecorder
                classes={{
                  AudioRecorderClass: "audio-recorder",
                  AudioRecorderStartSaveClass: "audio-recorder-start-save",
                }}
                onRecordingComplete={onRecordCompelete}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
              />
            </Box>
            <Divider orientation={sm ? "horizontal" : "vertical"} flexItem />
            <Box>
              <DragAndDropZone
                uploadFile={onUpload}
                title={"drop your file here or"}
                subtitle={"only wav files are allowed"}
                accept='audio/wav'
              />
            </Box>
          </Box>

          {audioText && (
            <>
              <Divider />
              <Typography variant='h6' sx={{ marginTop: 2 }}>
                Generated text from audio
              </Typography>
              <Box sx={{ px: 2 }}>
                {!highlightedText?.highlightedText ? (
                  <Typography
                    variant='body1'
                    sx={{ marginTop: 2 }}
                    id={"AudioText"}
                    ref={audioTextRef}
                  >
                    {audioText}
                  </Typography>
                ) : (
                  <HighlightedText {...highlightedText} />
                )}
              </Box>
            </>
          )}

          {isNateqSuccess && (
            <>
              <Divider sx={{ pt: 2 }} />
              <Typography variant='h6' sx={{ my: 2 }}>
                Generated audio from text
              </Typography>
              <Box>
                <audio ref={audioRef} controls onTimeUpdate={timeUpdate} />
              </Box>
            </>
          )}
        </Box>
      )}
    </PageContainer>
  );
}

export default Echo;
