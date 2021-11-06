# React 시작하기

<br>

___


## pull 받아 실행하기

> 이 단계는 react 환경이 구축되어 있어야 한다. 만약 react환경이 구축되어 있지 않다면 아래의 "React 환경 구성하기" 부분을 먼저 따라하길 바란다.

1. 패키지 설치
    * package.json 파일에 입력한 패키지를 설치한다.
        * npm install
2. 프로젝트 실행
    * npm start run


<br>

___


<br>


## React 환경 구성하기

> Windows 10에서 React 환경구성을 하였다.


___


### 1. node.js 설치

<br>


___


<br>

### 2. npm을 이용하여 create-react-app 설치

<br>

> cmd 창을 열어 다음 명령어들을 입력해주자.

```
npm install -g create-react-app
create-react-app -V
```
```
<create-react-app을 설치하는데 g옵션을 줘서 어디에서든 실행가능하게 한다.>
<설치 확인(버전 확인)>
```

___


<br>

### 3. 개발환경 구축

<br>

> 프로젝트를 개발할 디렉토리(egoing)를 만들고 그 디렉토리(egoing)에서 cmd창을 실행시킨다.

```
create-react-app .
```

<br>


___


<br>

### 4. 실행

```
npm start run
```

<br>

___


<br>

### 4. 프로젝트 배포

```
npm run build
npm install -g serve
npx serve -s build
```

<br>

___



















