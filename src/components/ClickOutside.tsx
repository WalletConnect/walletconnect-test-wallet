import * as React from "react";

interface IClickOutsideProps {
  onClickOutside: any;
}

class ClickOutside extends React.Component<IClickOutsideProps> {
  private element: HTMLDivElement | null;
  private isTouch: boolean;

  public componentDidMount() {
    this.isTouch = true;
    document.addEventListener("touchend", this.handle, true);
    document.addEventListener("click", this.handle, true);
  }

  public componentWillUnmount() {
    document.removeEventListener("touchend", this.handle, true);
    document.removeEventListener("click", this.handle, true);
  }

  public handle = (event: any) => {
    if (event.type === "touchend") {
      this.isTouch = true;
    }
    if (event.type === "click" && this.isTouch) {
      return;
    }
    const { onClickOutside } = this.props;
    const element = this.element;
    if (element) {
      if (!element.contains(event.target)) {
        onClickOutside(event);
      }
    }
  };

  public render() {
    const { children, onClickOutside, ...props } = this.props;
    return (
      <div {...props} ref={c => (this.element = c)}>
        {children}
      </div>
    );
  }
}

export default ClickOutside;
