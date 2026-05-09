import {
  StyledActionButton,
  ActionButtonText,
  ActionButtonIcon,
} from "./TableActionButton.styles";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const icons = {
  add: (
    <PlusIcon />
  ),
  remove: (
    <TrashIcon />
  ),
  edit: (
    <PencilIcon />
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
