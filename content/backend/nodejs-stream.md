---
title: "Node.js Stream 流式处理"
date: "2025-05-20"
category: "backend"
tags: ["Node.js", "Stream", "后端"]
summary: "理解 Node.js 中 Stream 的四种类型及其应用场景，掌握流式数据处理的核心概念"
---

## 为什么需要 Stream

处理大文件时，如果一次性读入内存会导致内存溢出。Stream 通过逐块处理数据解决了这个问题。

## 四种 Stream 类型

| 类型 | 描述 | 示例 |
|------|------|------|
| Readable | 可读流 | fs.createReadStream |
| Writable | 可写流 | fs.createWriteStream |
| Duplex | 双工流（可读可写） | TCP Socket |
| Transform | 转换流 | zlib.createGzip |

## 基本用法

### 读取文件

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('big-file.txt', { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});

readStream.on('end', () => {
  console.log('Finished reading');
});
```

### Pipe 管道

```javascript
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
```

## 背压（Backpressure）

当数据生产速度大于消费速度时，会产生背压。正确处理背压很重要：

```javascript
readStream.on('data', (chunk) => {
  const canContinue = writeStream.write(chunk);
  if (!canContinue) {
    readStream.pause();
    writeStream.once('drain', () => readStream.resume());
  }
});
```

掌握 Stream 是 Node.js 高性能编程的关键。
