import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Sentinel } from './Sentinel';


let observeMock = vi.fn();
let unobserveMock = vi.fn();
let disconnectMock = vi.fn();
let intersectionCallback = null;

beforeEach(() => {
  observeMock = vi.fn();
  unobserveMock = vi.fn();
  disconnectMock = vi.fn();
  intersectionCallback = null;

  window.IntersectionObserver = vi.fn(function (callback, _options) {
    intersectionCallback = callback;
    return {
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    };
  });
});

window.IntersectionObserver = vi.fn(function(callback, options) {
  intersectionCallback = callback;
  return {
    observe: observeMock,
    unobserve: unobserveMock,
    disconnect: disconnectMock,
  };
});

const triggerIntersection = () => {
  if (intersectionCallback) {
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
  }
};


describe('Sentinel', () => {
  it('renders nothing when hasMore is false', () => {
    const { container } = render(
      <Sentinel onIntersect={vi.fn()} loading={false} hasMore={false} />
    );
    expect(container.firstChild).toBeNull();
  });

it('renders a hidden div when hasMore is true', () => {
  const { container } = render(
    <Sentinel onIntersect={vi.fn()} loading={false} hasMore={true} />
  );

  const sentinel = container.querySelector('.h-4.w-full');

  expect(sentinel).toBeInTheDocument();
  expect(sentinel).toHaveClass('h-4', 'w-full');
  expect(sentinel).toHaveAttribute('aria-hidden', 'true');
});

  it('calls onIntersect when the sentinel enters the viewport', () => {
    const onIntersect = vi.fn();
    render(<Sentinel onIntersect={onIntersect} loading={false} hasMore={true} />);

    triggerIntersection();
    expect(onIntersect).toHaveBeenCalledOnce();
  });

  it('does not call onIntersect while loading is true', () => {
    const onIntersect = vi.fn();
    render(<Sentinel onIntersect={onIntersect} loading={true} hasMore={true} />);

    expect(window.IntersectionObserver).not.toHaveBeenCalled();
    triggerIntersection();
    expect(onIntersect).not.toHaveBeenCalled();
  });

  it('does not observe when hasMore is false (component null)', () => {
    render(<Sentinel onIntersect={vi.fn()} loading={false} hasMore={false} />);
    expect(window.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('unobserves on unmount', () => {
    const { unmount } = render(
      <Sentinel onIntersect={vi.fn()} loading={false} hasMore={true} />
    );
    unmount();
    expect(unobserveMock).toHaveBeenCalledOnce();
  });

  it('re-observes when loading changes from true to false', () => {
    const onIntersect = vi.fn();
    const { rerender } = render(
      <Sentinel onIntersect={onIntersect} loading={true} hasMore={true} />
    );
    expect(window.IntersectionObserver).not.toHaveBeenCalled();

    rerender(<Sentinel onIntersect={onIntersect} loading={false} hasMore={true} />);
    expect(window.IntersectionObserver).toHaveBeenCalled();

    triggerIntersection();
    expect(onIntersect).toHaveBeenCalledOnce();
  });
});