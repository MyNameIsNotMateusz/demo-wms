import { useState } from "react";
import { FormLayout, FormCard } from "../../../components/layout";
import { tabsConfig } from "./tabsConfig";
import { FormCardWrapper, FormRow } from "./PlannedDeliveryForm.styles";
import { FormSelect, FormTabs, FormInput } from "../../../components/ui";
import { updateFormData } from "../../../utils/forms/updateFormData";
import { useSelector } from "react-redux";

export const PlannedDeliveryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    contractor_tax_id: "",
    planned_date: "",
    delivery_document: "",
    remarks: "",
    items: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const { contractors } = useSelector((state) => state.contractors);

  return (
    <FormLayout
      title="Planned Delivery Form"
      onClose={onClose}
      isLoading={isLoading}
    >
      <FormCardWrapper>
        <FormCard title="Delivery Details">
          <FormRow>
            <FormSelect
              id="contractor"
              label="Contractor Selection *"
              placeholder="Select a Contractor"
              value={formData.contractor_tax_id}
              handleChange={(val) =>
                updateFormData(setFormData, "contractor_tax_id", val)
              }
              options={contractors.map((c) => ({
                label: c.name,
                value: c.tax_id,
              }))}
            />
          </FormRow>
          <FormRow>
            <FormInput
              id="plannedDate"
              label="Planned Delivery Date *"
              type="date"
              value={formData.planned_date}
              disabled={!formData.contractor_tax_id}
              handleChange={(val) =>
                updateFormData(setFormData, "planned_date", val)
              }
            />
          </FormRow>
          <FormRow>
            <FormInput
              id="deliveryDocument"
              label="Delivery Document"
              type="text"
              value={formData.delivery_document}
              disabled={!formData.contractor_tax_id}
              handleChange={(val) =>
                updateFormData(setFormData, "delivery_document", val)
              }
            />
          </FormRow>
          <FormRow>
            <FormInput
              id="remarks"
              label="Remarks"
              type="text"
              value={formData.remarks}
              disabled={!formData.contractor_tax_id}
              handleChange={(val) =>
                updateFormData(setFormData, "remarks", val)
              }
            />
          </FormRow>
        </FormCard>
        <FormCard title="Delivery Items"></FormCard>
      </FormCardWrapper>

      <FormTabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </FormLayout>
  );
};
