---
title: "二分查找算法详解"
date: "2025-04-10"
category: "algorithm"
tags: ["算法", "二分查找", "LeetCode"]
summary: "二分查找的原理、模板和常见变体，附 LeetCode 实战练习"
---

## 基本原理

二分查找要求数组有序，每次将搜索范围缩小一半，时间复杂度 O(log n)。

## 标准模板

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

## 常见变体

### 查找左边界

```python
def left_bound(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left if left < len(nums) and nums[left] == target else -1
```

### 查找右边界

```python
def right_bound(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] <= target:
            left = mid + 1
        else:
            right = mid - 1
    return right if right >= 0 and nums[right] == target else -1
```

## 注意事项

1. 使用 `left + (right - left) // 2` 避免整数溢出
2. 明确搜索区间是闭区间 `[left, right]` 还是半开区间 `[left, right)`
3. 循环条件与区间定义保持一致

## 练习推荐

- LeetCode 704: 二分查找
- LeetCode 34: 在排序数组中查找元素的第一个和最后一个位置
- LeetCode 33: 搜索旋转排序数组
