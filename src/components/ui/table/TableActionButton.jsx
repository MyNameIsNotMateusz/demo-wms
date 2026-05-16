import {
  StyledActionButton,
  ActionButtonText,
  ActionButtonIcon,
} from "./TableActionButton.styles";
import { PlusIcon, TrashIcon, PencilIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

const icons = {
  add: (
    <PlusIcon />
  ),
  addMultiple: (
    <RectangleStackIcon />
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
  addMultiple: "Multi",
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
