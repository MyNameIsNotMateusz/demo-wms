import { AlternativeGroupsWrapper } from "./AlternativeGroups.styles"
import { AlternativeGroupItem } from "./AlternativeGroupItem"

export const AlternativeGroups = ({
    groups,
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
    return (
        <AlternativeGroupsWrapper>
            {groups.map((group) => (
                <AlternativeGroupItem
                    key={group.group}
                    group={group}
                    selectedGroup={selectedGroup}
                    handleSelectGroup={handleSelectGroup}
                    handleAddAlternativeMaterial={handleAddAlternativeMaterial}
                    recipeMaterials={recipeMaterials}
                    selectedProcess={selectedProcess}
                    activeAlternativeRow={activeAlternativeRow}
                    setActiveAlternativeRow={setActiveAlternativeRow}
                    materials={materials}
                    availableMaterialCodes={availableMaterialCodes}
                    setHasChanges={setHasChanges}
                />
            ))}
        </AlternativeGroupsWrapper>
    )
}