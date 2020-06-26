# Nine Chronicles Launcher

## 개요

Nine Chronicles를 구동하기 위한 일렉트론 기반의 멀티플랫폼 런처입니다.
기본적인 골격은 다음과 같습니다:

```
./src
|   +-- resources
|   +-- styles
|   +-- views
|   |   +-- MainView.tsx
|   |   +-- LoginView.tsx
|   |   +-- LobbyView.tsx
|   +-- main-process.ts
|   +-- App.tsx
```

## 실행방법

먼저, 두 개의 추가 바이너리가 필요합니다.

- NineChronicles Standalone
- NineChronicles Unity

두 개의 바이너리를 해당 디렉터리와 같게 배치해 주십시오.

```
./src
./dist
|   +-- 9c.(exe|app) // NineChronicles Unity
|   +-- publish // NineChronicles Standalone
|   |   +-- Libpalnet.dll
|   |   +-- Grpc.Core.dll
|   |   +-- ...
|   |   +-- NineChronicles.Standalone.Executable(.exe)
```

그 뒤 하기의 명령어를 입력합니다.

```js
npm install //의존성 설치
npm run server //렌더러 빌드 후 webpack-hot-reload 실행
npm run start //메인 프로세스 빌드 후 electron 실행
```

## 개발 방법

기본적으로 프론트엔드는 `webpack-hot-reload` 가 있어, 변경하는 즉시 반영됩니다.
렌더러 프로세스에서 작업할 때는 일렉트론 재시작이 필요가 없으며, 메인 프로세스에 변경점이 생기면 그때 일렉트론 종료 후 재실행 해 주십시오.

### mobx-devtools

mobx-devtools를 사용할 수 있습니다. 먼저, 스탠드얼론 mobx-devtools를 설치해 주십시오

```sh
npm install -g mobx-devtools
```

그 다음, mobx-devtools를 실행해 주십시오

```sh
mobx-devtools
```

이제 `npm run server` 와 `npm run start`를 하시면 mobx-devtools에 전역 상태가 나타나는 것을 볼 수 있습니다.

## 빌드 방법

```js
npm run build //개발 빌드
npm run build-prod //프로덕션 빌드
```

## 패키징 방법

```js
npm run pack
```

## 로깅 위치

로그는 다음 위치에 쌓입니다.

```
- on macOS: ~/Library/Logs/{app name}/{process type}.log
- on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs{process type}.log
```

## 코드 스타일 맞추기

```bash
npx pretty-quick --staged
```

### Visual Studio Code 확장

확장 화면(Windows: <kbd>⇧⌃X</kbd>, macOS: <kbd>⇧⌘X</kbd>)에서 다음 확장들을 설치합니다.

- [EditorConfig]
- [ESlint]
- [Prettier]

[editorconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
