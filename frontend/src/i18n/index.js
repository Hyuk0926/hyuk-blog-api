import { createI18n } from 'vue-i18n'

const messages = {
  ko: {
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
    home: {
      title: "Takahara's Blog",
      subtitle: "NoThing is Impossible",
      footer: "© 2025 Takahara Yuuki. All rights reserved.",
      nav: {
        knowledge: "지식모음",
        projects: "프로젝트",
        resume: "이력",
        contact: "Contact"
      }
    },
    user: {
      login: {
        title: "로그인",
        subtitle: "좋아요와 댓글을 작성하려면 로그인이 필요합니다",
        id: "아이디",
        password: "비밀번호",
        eye: "𝄐",
        button: "로그인",
        capslock: {
          warning: "CapsLock이 켜져 있습니다!"
        },
        back: {
          to: {
            main: "메인 페이지로 돌아가기"
          }
        },
        "back.to.main": "메인 페이지로 돌아가기"
      },
      logout: "로그아웃",
      register: {
        title: "회원가입",
        subtitle: "새로운 계정을 만들어보세요",
        username: "아이디",
        nickname: "닉네임",
        email: "이메일",
        password: "비밀번호",
        confirmPassword: "비밀번호 확인",
        button: "회원가입",
        registering: "가입 중...",
        link: "회원가입",
        back: {
          to: {
            main: "메인 페이지로 돌아가기"
          }
        }
      },
      account: {
        not: {
          exists: "계정이 없으신가요?"
        },
        exists: "이미 계정이 있으신가요?"
      },
      login: {
        link: "로그인"
      },
      register: {
        link: "회원가입"
      }
    },
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
    contact: {
      title: "문의하기",
      form: {
        name: "이름",
        email: "이메일",
        subject: "제목",
        message: "문의 내용",
        submit: "문의 보내기",
        "name.placeholder": "이름을 입력하세요",
        "email.placeholder": "이메일을 입력하세요",
        "subject.placeholder": "제목을 입력하세요",
        "message.placeholder": "문의 내용을 입력하세요"
      },
      info: "문의하신 내용은 저에게 전달됩니다. 메일 주소 첨부시 빠른 시일 내에 답변드리겠습니다.",
      "info.email": "이메일:",
      sending: "전송 중..."
    },
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
    post: {
      loading: "로딩 중...",
      notFound: "게시글을 찾을 수 없습니다.",
      comments: "댓글",
      loginToComment: "댓글을 작성하려면 로그인이 필요합니다.",
      commentPlaceholder: "댓글을 입력하세요...",
      addComment: "댓글 작성"
    },
    search: {
      title: "검색",
      placeholder: "검색어를 입력하세요...",
      loading: "검색 중...",
      noResults: "검색 결과가 없습니다.",
      results: "검색 결과"
    },
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
    error: {
      title: "페이지를 찾을 수 없습니다",
      message: "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.",
      backToHome: "홈으로 돌아가기",
      goBack: "이전 페이지"
    },
    footer: {
      description1: "블로그에 방문해주셔서 감사합니다.",
      description2: "문의, 제안, 협업은 언제든 연락 주세요.",
      copyrights: "© Takahara Yuuki. All rights reserved.",
      adminLogin: "관리자 로그인"
    },
    darkMode: {
      toggle: "다크모드 전환"
    },
    common: {
      loading: "로딩 중..."
    },
    index: {
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
    }
  },
  ja: {
    header: {
      title: "Takahara's Blog",
      nav: {
        home: "ホーム",
        knowledge: "知識まとめ",
        projects: "プロジェクト",
        resume: "履歴",
        contact: "Contact"
      }
    },
    home: {
      title: "Takahara's Blog",
      subtitle: "NoThing is Impossible",
      footer: "© 2025 Takahara Yuuki. All rights reserved.",
      nav: {
        knowledge: "知識まとめ",
        projects: "プロジェクト",
        resume: "履歴",
        contact: "Contact"
      }
    },
    user: {
      login: {
        title: "ログイン",
        subtitle: "いいねとコメントを書くにはログインが必要です",
        id: "ユーザーID",
        password: "パスワード",
        eye: "𝄐",
        button: "ログイン",
        capslock: {
          warning: "CapsLockがオンになっています！"
        },
        back: {
          to: {
            main: "メインページに戻る"
          }
        },
        "back.to.main": "メインページに戻る"
      },
      logout: "ログアウト",
      register: {
        title: "会員登録",
        subtitle: "新しいアカウントを作成してください",
        username: "ユーザーID",
        nickname: "ニックネーム",
        email: "メールアドレス",
        password: "パスワード",
        confirmPassword: "パスワード確認",
        button: "会員登録",
        registering: "登録中...",
        link: "会員登録",
        back: {
          to: {
            main: "メインページに戻る"
          }
        }
      },
      account: {
        not: {
          exists: "アカウントをお持ちでない方は"
        },
        exists: "すでにアカウントをお持ちですか？"
      },
      login: {
        link: "ログイン"
      },
      register: {
        link: "会員登録"
      }
    },
    about: {
      title: "履歴書",
      description: "開発者Takahara Yuukiの履歴書です。"
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
    contact: {
      title: "お問い合わせ",
      form: {
        name: "お名前",
        email: "メールアドレス",
        subject: "件名",
        message: "お問い合わせ内容",
        submit: "お問い合わせ送信",
        "name.placeholder": "お名前を入力してください",
        "email.placeholder": "メールアドレスを入力してください",
        "subject.placeholder": "件名を入力してください",
        "message.placeholder": "お問い合わせ内容を入力してください"
      },
      info: "お問い合わせいただいた内容は私に届きます。メールアドレスを添付していただければ、早急にご返信いたします。",
      "info.email": "メールアドレス:",
      sending: "送信中..."
    },
    project: {
      personal: {
        title: "個人プロジェクト",
        blog: {
          period: "2025.06 ~ 進行中",
          title: "Takahara's Blog (個人技術ブログ)",
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
    post: {
      loading: "読み込み中...",
      notFound: "投稿が見つかりません。",
      comments: "コメント",
      loginToComment: "コメントを書くにはログインが必要です。",
      commentPlaceholder: "コメントを入力してください...",
      addComment: "コメント投稿"
    },
    search: {
      title: "検索",
      placeholder: "検索語を入力してください...",
      loading: "検索中...",
      noResults: "検索結果がありません。",
      results: "検索結果"
    },
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
    error: {
      title: "ページが見つかりません",
      message: "お探しのページが存在しないか、移動された可能性があります。",
      backToHome: "ホームに戻る",
      goBack: "前のページ"
    },
    footer: {
      description1: "ブログにご訪問いただき、ありがとうございます。",
      description2: "お問い合わせ、提案、協力はいつでもご連絡ください。",
      copyrights: "© Takahara Yuuki. All rights reserved.",
      adminLogin: "管理者ログイン"
    },
    darkMode: {
      toggle: "ダークモード切り替え"
    },
    common: {
      loading: "読み込み中..."
    },
    index: {
      hero: {
        title: "Takahara Yuuki"
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