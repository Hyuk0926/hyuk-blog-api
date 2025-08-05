import { createI18n } from 'vue-i18n'

const messages = {
  ko: {
    // 헤더 및 공통
    header: {
      title: "Takahara's Blog",
      nav: { 
        home: "홈", 
        knowledge: "지식모음", 
        projects: "프로젝트", 
        resume: "이력", 
        contact: "Contact" 
      }
    },
    footer: {
      description1: "블로그에 방문해주셔서 감사합니다.",
      description2: "문의, 제안, 협업은 언제든 연락 주세요.",
      copyrights: "© Takahara Yuuki. All rights reserved.",
      adminLogin: "관리자 로그인"
    },
    // 사용자 인증
    user: {
      login: "로그인",
      register: "회원가입",
      logout: "로그아웃",
      login_title: "로그인",
      register_title: "회원가입",
      login_subtitle: "좋아요와 댓글을 작성하려면 로그인이 필요합니다",
      register_subtitle: "새로운 계정을 만들어보세요",
      login_button: "로그인",
      register_button: "회원가입",
      login_link: "로그인",
      register_link: "회원가입",
      account_exists: "이미 계정이 있으신가요?",
      account_not_exists: "계정이 없으신가요?",
      username: "아이디",
      password: "비밀번호",
      password_confirm: "비밀번호 확인",
      nickname: "닉네임",
      email: "이메일",
      back_to_main: "메인 페이지로 돌아가기",
      capslock_warning: "CapsLock이 켜져 있습니다!",
      registering: "가입 중..."
    },
    // 홈페이지
    home: {
      title: "Takahara's Blog",
      subtitle: "NoThing is Impossible",
      hero: {
        title: "Takahara Yuuki"
      },
      category: {
        title: "카테고리",
        all: "전체보기"
      },
      posts: {
        latest: "최신 게시글",
        count: {
          unit: "개"
        },
        empty: {
          title: "등록된 게시글이 없습니다",
          description: "첫 번째 게시글을 작성해보세요!"
        }
      },
      search: {
        placeholder: "검색어를 입력하세요..."
      },
      image: {
        none: "이미지 없음"
      }
    },
    // 이력서
    about: {
      title: "이력서",
      description: "개발자 Takahara Yuuki의 이력서입니다."
    },
    resume: {
      education: "학력",
      skills: "기술스택",
      studentLife: "학생생활(성장과정)",
      strengthsWeaknesses: "장점과 단점",
      effortExperience: "인생에서 노력했던 경험",
      japanItMotivation: "일본 IT 취업 지망동기",
      futurePlan: "장래의 계획 및 포부",
      table: {
        school: "학교명",
        major: "전공/학위",
        period: "기간"
      }
    },
    // 문의하기
    contact: {
      title: "문의하기",
      form: {
        name: "이름",
        email: "이메일",
        subject: "제목",
        message: "문의 내용",
        submit: "문의 보내기",
        name_placeholder: "이름을 입력하세요",
        email_placeholder: "이메일을 입력하세요",
        subject_placeholder: "제목을 입력하세요",
        message_placeholder: "문의 내용을 입력하세요"
      },
      info: "문의하신 내용은 저에게 전달됩니다. 메일 주소 첨부시 빠른 시일 내에 답변드리겠습니다.",
      info_email: "이메일:",
      sending: "전송 중..."
    },
    // 프로젝트
    project: {
      personal: {
        title: "개인 프로젝트",
        blog: {
          period: "2025.06 ~ 진행중",
          title: "Takahara's Blog (개인 기술 블로그)",
          desc: {
            1: "이력서/소개, 게시글 CRUD, 관리자 대시보드, 방문자수 통계, 다국어 지원, 문의 관리 등 다양한 기능",
            2: "데이터 영구 저장, 반응형 UI/UX, fragment 구조화",
            3: "최신 웹 트렌드 반영, 실시간 개선 및 유지보수"
          },
          role: "<b>진행한 것:</b> 전체 설계, 개발, 배포, 유지보수",
          result: "<b>성과/배운점:</b> Spring/Thymeleaf 실전 경험, 웹 아키텍처 설계, 실시간 피드백 반영, 유지보수성 높은 코드 작성"
        }
      },
      team: {
        title: "팀 프로젝트",
        collab: {
          period: "2025.09 ~ 2025.12",
          title: "TeamCollaboration (팀 협업 플랫폼)",
          desc: {
            1: "실시간 협업/채팅, 프로젝트 관리(이슈, 일정), 파일 공유, 알림 시스템",
            2: "CI/CD, 클라우드 배포, 코드 리뷰 및 협업 경험"
          },
          role: "<b>저의 역할:</b> 백엔드 API 설계/구현, DB 모델링, 배포 자동화",
          result: "<b>성과/배운점:</b> 협업 경험, 코드 리뷰, CI/CD, 실무 프로세스 경험, 커뮤니케이션 능력 향상",
          info: "<b>팀원:</b> 4명 (백엔드 2, 프론트엔드 1, 기획 1) / <b>협업툴:</b> GitHub, Notion, Slack 등"
        }
      },
      link: {
        github: "Github 보기"
      }
    },
    // 게시글
    post: {
      loading: "로딩 중...",
      notFound: "게시글을 찾을 수 없습니다.",
      comments: "댓글",
      loginToComment: "댓글을 작성하려면 로그인이 필요합니다.",
      commentPlaceholder: "댓글을 입력하세요...",
      addComment: "댓글 작성"
    },
    // 검색
    search: {
      title: "검색",
      placeholder: "검색어를 입력하세요...",
      loading: "검색 중...",
      noResults: "검색 결과가 없습니다.",
      results: "검색 결과"
    },
    // 관리자
    admin: {
      login: {
        title: "관리자 로그인",
        subtitle: "관리자 계정으로 로그인하세요",
        username: "아이디",
        password: "비밀번호",
        button: "로그인",
        loggingIn: "로그인 중...",
        backToMain: "메인 페이지로 돌아가기"
      },
      dashboard: {
        title: "관리자 대시보드",
        totalPosts: "총 게시글",
        totalUsers: "총 사용자",
        totalComments: "총 댓글",
        newInquiries: "새 문의",
        newPost: "새 게시글 작성",
        viewInquiries: "문의 관리",
        editResume: "이력서 편집",
        recentPosts: "최근 게시글",
        loading: "로딩 중...",
        noPosts: "게시글이 없습니다.",
        edit: "편집",
        delete: "삭제"
      }
    },
    // 에러 페이지
    error: {
      title: "페이지를 찾을 수 없습니다",
      message: "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.",
      backToHome: "홈으로 돌아가기",
      goBack: "이전 페이지"
    },
    // 공통
    darkMode: {
      toggle: "다크모드 전환"
    },
    common: {
      loading: "로딩 중..."
    }
  },
  ja: {
    // 헤더 및 공통
    header: {
      title: "高原のブログ",
      nav: { 
        home: "ホーム", 
        knowledge: "知識", 
        projects: "プロジェクト", 
        resume: "履歴", 
        contact: "お問い合わせ" 
      }
    },
    footer: {
      description1: "ブログに訪問していただきありがとうございます。",
      description2: "ご意見、ご提案、コラボレーションはいつでもご連絡ください。",
      copyrights: "© 高原優輝。全著作権所有。",
      adminLogin: "管理者ログイン"
    },
    // 사용자 인증
    user: {
      login: "ログイン",
      register: "会員登録",
      logout: "ログアウト",
      login_title: "ログイン",
      register_title: "会員登録",
      login_subtitle: "いいねとコメントを投稿するにはログインが必要です",
      register_subtitle: "新しいアカウントを作成してください",
      login_button: "ログイン",
      register_button: "会員登録",
      login_link: "ログイン",
      register_link: "会員登録",
      account_exists: "すでにアカウントをお持ちですか？",
      account_not_exists: "アカウントをお持ちでないですか？",
      username: "ユーザーID",
      password: "パスワード",
      password_confirm: "パスワード確認",
      nickname: "ハンドル名",
      email: "メールアドレス",
      back_to_main: "メインページに戻る",
      capslock_warning: "CapsLockがオンになっています！",
      registering: "登録中..."
    },
    // 홈페이지
    home: {
      title: "高原のブログ",
      subtitle: "NoThing is Impossible",
      hero: {
        title: "高原優輝"
      },
      category: {
        title: "カテゴリー",
        all: "すべて表示"
      },
      posts: {
        latest: "最新投稿",
        count: {
          unit: "件"
        },
        empty: {
          title: "投稿がありません",
          description: "最初の投稿を作成してみましょう！"
        }
      },
      search: {
        placeholder: "検索語を入力してください..."
      },
      image: {
        none: "画像なし"
      }
    },
    // 이력서
    about: {
      title: "履歴書",
      description: "開発者高原優輝の履歴書です。"
    },
    resume: {
      education: "学歴",
      skills: "技術スタック",
      studentLife: "学生生活(成長過程)",
      strengthsWeaknesses: "長所と短所",
      effortExperience: "人生で努力した経験",
      japanItMotivation: "日本IT就職志望動機",
      futurePlan: "将来の計画及び抱負",
      table: {
        school: "学校名",
        major: "専攻/学位",
        period: "期間"
      }
    },
    // 문의하기
    contact: {
      title: "お問い合わせ",
      form: {
        name: "お名前",
        email: "メールアドレス",
        subject: "件名",
        message: "お問い合わせ内容",
        submit: "お問い合わせ送信",
        name_placeholder: "お名前を入力してください",
        email_placeholder: "メールアドレスを入力してください",
        subject_placeholder: "件名を入力してください",
        message_placeholder: "お問い合わせ内容を入力してください"
      },
      info: "お問い合わせいただいた内容は私に届きます。メールアドレスを添付していただければ、早急にご返信いたします。",
      info_email: "メールアドレス:",
      sending: "送信中..."
    },
    // 프로젝트
    project: {
      personal: {
        title: "個人プロジェクト",
        blog: {
          period: "2025.06 ~ 進行中",
          title: "高原のブログ (個人技術ブログ)",
          desc: {
            1: "履歴書/紹介、投稿CRUD、管理者ダッシュボード、訪問者数統計、多言語対応、お問い合わせ管理など様々な機能",
            2: "データ永続化、レスポンシブUI/UX、fragment構造化",
            3: "最新Webトレンド反映、リアルタイム改善・保守"
          },
          role: "<b>担当したこと:</b> 全体設計、開発、デプロイ、保守",
          result: "<b>成果・学んだこと:</b> Spring/Thymeleaf実戦経験、Webアーキテクチャ設計、リアルタイムフィードバック反映、保守性の高いコード作成"
        }
      },
      team: {
        title: "チームプロジェクト",
        collab: {
          period: "2025.09 ~ 2025.12",
          title: "TeamCollaboration (チーム協業プラットフォーム)",
          desc: {
            1: "リアルタイム協業/チャット、プロジェクト管理(課題、スケジュール)、ファイル共有、通知システム",
            2: "CI/CD、クラウドデプロイ、コードレビュー・協業経験"
          },
          role: "<b>私の役割:</b> バックエンドAPI設計/実装、DBモデリング、デプロイ自動化",
          result: "<b>成果・学んだこと:</b> 協業経験、コードレビュー、CI/CD、実務プロセス経験、コミュニケーション能力向上",
          info: "<b>チームメンバー:</b> 4名 (バックエンド2、フロントエンド1、企画1) / <b>協業ツール:</b> GitHub、Notion、Slackなど"
        }
      },
      link: {
        github: "Githubを見る"
      }
    },
    // 게시글
    post: {
      loading: "読み込み中...",
      notFound: "投稿が見つかりません。",
      comments: "コメント",
      loginToComment: "コメントを書くにはログインが必要です。",
      commentPlaceholder: "コメントを入力してください...",
      addComment: "コメント投稿"
    },
    // 검색
    search: {
      title: "検索",
      placeholder: "検索語を入力してください...",
      loading: "検索中...",
      noResults: "検索結果がありません。",
      results: "検索結果"
    },
    // 관리자
    admin: {
      login: {
        title: "管理者ログイン",
        subtitle: "管理者アカウントでログインしてください",
        username: "ユーザーID",
        password: "パスワード",
        button: "ログイン",
        loggingIn: "ログイン中...",
        backToMain: "メインページに戻る"
      },
      dashboard: {
        title: "管理者ダッシュボード",
        totalPosts: "総投稿数",
        totalUsers: "総ユーザー数",
        totalComments: "総コメント数",
        newInquiries: "新規お問い合わせ",
        newPost: "新規投稿作成",
        viewInquiries: "お問い合わせ管理",
        editResume: "履歴書編集",
        recentPosts: "最近の投稿",
        loading: "読み込み中...",
        noPosts: "投稿がありません。",
        edit: "編集",
        delete: "削除"
      }
    },
    // 에러 페이지
    error: {
      title: "ページが見つかりません",
      message: "お探しのページが存在しないか、移動された可能性があります。",
      backToHome: "ホームに戻る",
      goBack: "前のページ"
    },
    // 공통
    darkMode: {
      toggle: "ダークモード切り替え"
    },
    common: {
      loading: "読み込み中..."
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'ko',
  fallbackLocale: 'ko',
  messages
})

export default i18n 