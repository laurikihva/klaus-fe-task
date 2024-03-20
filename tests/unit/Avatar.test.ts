import { mount } from "@vue/test-utils";

import Avatar from "@/components/Avatar.vue";

const wrapper = mount(Avatar, {
  props: {
    name: "Test Name",
    email: "test.name@email.com",
    image: "https://placehold.co/32x32",
  },
});

describe("Loads and displays Avatar component", () => {
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains name, email and base classes", () => {
    expect(wrapper.text()).toContain("Test Name");
    expect(wrapper.text()).toContain("test.name@email.com");

    expect(wrapper.classes("flex")).toBe(true);
    expect(wrapper.classes("gap-3")).toBe(true);
    expect(wrapper.classes("items-center")).toBe(true);
  });
});
