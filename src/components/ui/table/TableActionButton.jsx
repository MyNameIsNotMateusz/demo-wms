import {
  StyledActionButton,
  ActionButtonText,
  ActionButtonIcon,
} from "./TableActionButton.styles";

const icons = {
  add: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke="currentColor"
      fill="none"
    >
      <line y2="19" y1="5" x2="12" x1="12" />
      <line y2="12" y1="12" x2="19" x1="5" />
    </svg>
  ),
  remove: (
    <svg
      className="svg"
      height="512"
      viewBox="0 0 512 512"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Delete</title>
      <path
        d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
      ></path>
      <line
        style={{
          stroke: "#fff",
          strokeLinecap: "round",
          strokeMiterlimit: "10",
          strokeWidth: "32px",
        }}
        x1="80"
        x2="432"
        y1="112"
        y2="112"
      ></line>
      <path
        d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
      ></path>
      <line
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
        x1="256"
        x2="256"
        y1="176"
        y2="400"
      ></line>
      <line
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
        x1="184"
        x2="192"
        y1="176"
        y2="400"
      ></line>
      <line
        style={{
          fill: "none",
          stroke: "#fff",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
        x1="328"
        x2="320"
        y1="176"
        y2="400"
      ></line>
    </svg>
  ),
  edit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
    >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  )
};

const labels = {
  add: "Add",
  remove: "Remove",
  edit: "Edit"
};

export const TableActionButton = ({ handleClick, type, isSmall = false }) => {
  return (
    <StyledActionButton $isSmall={isSmall} onClick={handleClick}>
      <ActionButtonText $isSmall={isSmall}>{labels[type]}</ActionButtonText>
      <ActionButtonIcon $isSmall={isSmall}>{icons[type]}</ActionButtonIcon>
    </StyledActionButton>
  );
};
