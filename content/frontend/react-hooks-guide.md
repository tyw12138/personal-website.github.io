---
title: "React Hooks 完全指南"
date: "2025-06-15"
category: "frontend"
tags: ["React", "Hooks", "前端"]
summary: "深入理解 React Hooks 的工作原理和最佳实践，涵盖 useState、useEffect 等核心 Hook"
---

## 什么是 Hooks

Hooks 是 React 16.8 引入的新特性，让你在函数组件中使用 state 和其他 React 特性。

## useState

最基础的 Hook，用于在函数组件中添加状态：

```jsx
const [count, setCount] = useState(0);
```

### 注意事项

- 不要在循环、条件或嵌套函数中调用 Hook
- Hook 的调用顺序必须保持一致

## useEffect

用于处理副作用，如数据获取、订阅、DOM 操作等：

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
  return () => {
    // 清理函数
  };
}, [count]);
```

### 依赖数组

- 空数组 `[]`：仅在挂载时执行
- 不传数组：每次渲染都执行
- 传入依赖项：依赖变化时执行

## useMemo 和 useCallback

用于性能优化，避免不必要的计算和重渲染：

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

## 自定义 Hook

将组件逻辑提取到可复用的函数中：

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}
```

自定义 Hook 让逻辑复用变得简单而优雅。
