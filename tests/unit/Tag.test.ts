import { mount } from "@vue/test-utils";

import Tag from "@/components/Tag.vue";

const wrapper = mount(Tag, {
  props: {
    label: "My tag",
    color: "pink",
  },
});

describe("Loads and displays Tag component", () => {
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains label and base classes", () => {
    expect(wrapper.text()).toContain("My tag");

    expect(wrapper.classes("inline-flex")).toBe(true);
    expect(wrapper.classes("bg-pink-100")).toBe(true);
    expect(wrapper.classes("rounded")).toBe(true);
    expect(wrapper.classes("min-h-[24px]")).toBe(true);
  });
});
