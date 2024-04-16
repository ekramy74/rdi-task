import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import audioImg from "../../assets/svgs/audioWave.svg";

type DragAndDropZoneProps = {
  uploadFile: (file: File) => void;
  bgColor?: string;
  title?: any;
  subtitle?: any;
  icon?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  fileSize?: number;
};
export const DragAndDropZone = ({
  uploadFile,
  bgColor,
  title,
  subtitle,
  accept,
  multiple,
  icon,
  disabled,
}: DragAndDropZoneProps) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const uploadRef = React.useRef(HTMLDivElement as any);
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "none";
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    uploadFile(droppedFile);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  function readImage(file: File) {
    setFile(file);
    uploadFile(file);
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: 5,
          height: "200px",
          border: (theme) => `2px dashed ${theme.palette.grey[300]}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: (theme) => bgColor ?? theme.palette.grey[100],
          borderRadius: "10px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: (theme) =>
              disabled
                ? bgColor ?? `${theme.palette.grey[100]}`
                : theme.palette.grey[200],
            borderColor: (theme) =>
              disabled
                ? `${theme.palette.grey[300]}`
                : `${theme.palette.primary.main}`,
            cursor: disabled ? "not-allowed" : "pointer",
          },
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isDragging ? (
          <Typography variant={"h6"} display={"inline-block"} color={"black"}>
            Rlease to drop the file
          </Typography>
        ) : (
          <>
            <img src={icon ?? audioImg} alt={"test"} width={80} />
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography
                variant={"h6"}
                display={"inline-block"}
                color={"black"}
                textAlign='center'
              >
                {title ?? "Drop your file here"}{" "}
                <span
                  style={{
                    color: disabled
                      ? theme.palette.grey[500]
                      : theme.palette.primary.main,
                    cursor: disabled ? "not-allowed" : "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => uploadRef?.current.click()}
                >
                  Browse
                </span>
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {subtitle && (
                <Typography
                  variant={"body1"}
                  align='center'
                  color={(theme) => theme.palette.grey[400]}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </>
        )}
        <input
          ref={uploadRef}
          onInput={(event) => {
            // @ts-ignore
            readImage(event.target?.files[0]);
          }}
          accept={accept ?? "audio/*"}
          type='file'
          multiple={multiple ?? false}
          disabled={disabled}
          hidden
        />
        {file && <Typography>{`File: ${file.name}`}</Typography>}
      </Box>
    </Box>
  );
};
