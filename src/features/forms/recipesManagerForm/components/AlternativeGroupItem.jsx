import {
    GroupItemWrapper,
    GroupItemHeader,
    GroupItemTitle,
    GroupItemActions,
    GroupItemContent,
    GroupItemRow
} from "./AlternativeGroupItem.styles";
import { CellInput, TableActionButton } from "../../../../components/ui";
import { getGroupItems } from "../helpers/groupHelpers";
import { handleRowClick } from "../../../../utils/table/tableRowSelection";
import { useDispatch } from "react-redux";
import { handleRemoveMaterial } from "../utils/handleRemoveMaterial";
import { TableSelect } from "../../../../components/ui/table/TableSelect";
import { updateRecipeMaterial, updateRecipeQuantity } from "../recipesManagerFormSlice";
import { useState } from "react";
import { handleFocus, handleChange, handleBlur } from "../../../../utils/table/cellHandlers";

export const AlternativeGroupItem = ({
    group,
    selectedGroup,
    handleSelectGroup,
    handleAddAlternativeMaterial,
    recipeMaterials,
    selectedProcess,
    activeAlternativeRow,
    setActiveAlternativeRow,
    materials,
    availableMaterialCodes,
    setHasChanges
}) => {

    const dispatch = useDispatch();

    const groupItems = getGroupItems(
        recipeMaterials,
        selectedProcess,
        group.group
    );

    const [editedValues, setEditedValues] = useState({});

    return (
        <GroupItemWrapper>
            <GroupItemHeader>
                <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    checked={selectedGroup === group.group.toString()}
                    onChange={() => handleSelectGroup(group.group)}
                />
                <GroupItemTitle>
                    Group {group.group}
                </GroupItemTitle>
                <GroupItemActions>
                    <TableActionButton
                        handleClick={() => handleAddAlternativeMaterial(group.group)}
                        type="add"
                        isSmall={true}
                    />
                    <TableActionButton
                        handleClick={() => handleRemoveMaterial({
                            selectedMaterials: activeAlternativeRow,
                            data: groupItems,
                            dispatch,
                            selectedProcess,
                            setSelectedMaterials: setActiveAlternativeRow,
                            setHasChanges
                        })}
                        type="remove"
                        isSmall={true}
                    />
                </GroupItemActions>
            </GroupItemHeader>
            <GroupItemContent>
                {groupItems.map((row) => (
                    <GroupItemRow key={row.material_code}>
                        <input
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            checked={activeAlternativeRow[row.material_code] || false}
                            onChange={() =>
                                handleRowClick(
                                    row.material_code,
                                    setActiveAlternativeRow,
                                    false,
                                )
                            }
                        />
                        <TableSelect
                            id="material_code"
                            value={row.material_code}
                            handleChange={(val) => {
                                dispatch(
                                    updateRecipeMaterial({
                                        id: row.material_code,
                                        key: "material_code",
                                        value: val,
                                        materials,
                                        selectedProcess
                                    })
                                );
                                setHasChanges(true);
                            }}
                            options={[
                                ...(row.material_code !== ""
                                    ? [{ label: row.material_code, value: row.material_code }]
                                    : []),
                                ...availableMaterialCodes.map((code) => ({
                                    label: code.material_code,
                                    value: code.material_code,
                                })),
                            ]}
                        />
                        <CellInput
                            type="number"
                            value={
                                editedValues[row.material_code]?.quantity ?? row.quantity
                            }
                            handleFocus={(val) => {
                                handleFocus(
                                    "quantity",
                                    row.quantity,
                                    setEditedValues,
                                    row.material_code,
                                );
                            }}
                            handleChange={(val) => {
                                handleChange("quantity", val, setEditedValues, row.material_code);
                            }}
                            handleBlur={(val) => {
                                handleBlur(
                                    dispatch,
                                    (payload) =>
                                        updateRecipeQuantity({
                                            ...payload,
                                            selectedProcess,
                                        }),
                                    row.material_code,
                                    "quantity",
                                    val,
                                    setEditedValues,
                                    "number",
                                );
                                setHasChanges(true);
                            }}
                        />
                    </GroupItemRow>
                ))}
            </GroupItemContent>
        </GroupItemWrapper>
    )
};