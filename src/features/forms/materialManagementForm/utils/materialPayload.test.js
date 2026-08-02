import { prepareMaterialPayload } from "./materialPayload";

describe("prepareMaterialPayload", () => {
  it("should remove created_at, updated_at, and graphic_uml when the material is edited.", () => {
    const data = {
      code: "105FG",
      created_at: "2026-03-03 08:20",
      updated_at: "2026-03-03 08:20",
      graphic_uml: null,
    };

    const result = prepareMaterialPayload(data, "edit");

    expect(result).toEqual({
      code: "105FG",
    });
  });
});
