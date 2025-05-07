document.addEventListener("DOMContentLoaded", () => {
  // 初始化变量
  let drawnCards = []
  let isDrawing = false

  // 声明 cardPool 变量
  const cardPool = [
  // 普通卡牌 (Common)
  {
    id: 1,
    name: "禁止上场",
    rarity: "common",
    effect: "赛前使用。禁止对方一名球员在下场比赛中出战。",
  },
  {
    id: 2,
    name: "S1MON替补",
    rarity: "common",
    effect: "赛中暂停使用。使对方一名球员下放到替补席。",
  },
  {
    id: 3,
    name: "无规则模式",
    rarity: "common",
    effect: "赛前使用。下一场比赛为无规则模式。",
  },
  {
    id: 4,
    name: "一击必杀",
    rarity: "common",
    effect: "赛前使用。下一场比赛谁先进球谁取得胜利。",
  },
  {
    id: 5,
    name: "能力限制",
    rarity: "common",
    effect: "赛前使用。下一场比赛对手场上必须有能力值低于125的球员。",
  },
  {
    id: 6,
    name: "中国力量",
    rarity: "common",
    effect: "赛前使用。下一场比赛对手场上必须有中国球员。",
  },
  {
    id: 7,
    name: "单锋又何妨",
    rarity: "common",
    effect: "赛前使用。下一场比赛对手场上锋线只能有一人。",
  },
  {
    id: 8,
    name: "战术角球",
    rarity: "common",
    effect: "对手角球时使用。对手只能短传发出角球。",
  },
  {
    id: 9,
    name: "三角力量",
    rarity: "common",
    effect: "赛前使用。对手下场只能三后卫。",
  },
  {
    id: 10,
    name: "拼满全场",
    rarity: "common",
    effect: "赛前使用。对手下场比赛不得做出自愿的换人调整。",
  },
 

  // 稀有卡牌 (Rare)
  {
    id: 101,
    name: "一个在东一个在西",
    rarity: "rare",
    effect: "赛前使用。下一场比赛对手的左边锋为西罗，右边锋为梅东。",
  },
  {
    id: 102,
    name: "球权互换",
    rarity: "rare",
    effect: "赛中任意时刻使用。若对手不在禁区内，此时必须移交球权。",
  },
  {
    id: 103,
    name: "快乐足球",
    rarity: "rare",
    effect: "赛前使用。下一场对手锋线需出现斯特林或卢卡库。",
  },
  {
    id: 104,
    name: "无懈可击",
    rarity: "rare",
    effect: "任意时刻使用。反制对手稀有品质及以下的一张卡牌",
  },
  {
    id: 105,
    name: "中锋梅西",
    rarity: "rare",
    effect: "赛前使用。下场比赛对手的中锋须为梅西。",
  },
  {
    id: 106,
    name: "前锋的心",
    rarity: "rare",
    effect: "赛中暂停使用。指定对手的某一中场和前锋交换位置。",
  },

  // 史诗卡牌 (Epic)
  {
    id: 201,
    name: "客串后卫",
    rarity: "epic",
    effect: "赛中暂停使用。指定对手的某一前锋和后卫交换位置。",
  },
  {
    id: 202,
    name: "半场香槟",
    rarity: "epic",
    effect: "中场时使用。若对手半场领先两球及以上，需自摆乌龙一球。",
  },
  {
    id: 203,
    name: "射术大比拼",
    rarity: "epic",
    effect: "赛前使用。本场比赛结束后谁的射正数多，增加一粒进球，若平局骰子拼点。",
  },

  // 传说卡牌 (Legendary)
  {
    id: 301,
    name: "质数传奇",
    rarity: "legendary",
    effect: "赛后跳出数据前使用。若本场比赛你和你对手的射门数加起来是质数，则你直接获胜。",
  },
  {
    id: 302,
    name: "梦幻开局",
    rarity: "legendary",
    effect: "赛前使用。对手开局需自摆乌龙一球。",
  },
  ]

  // 声明 rarityNames 变量
  const rarityNames = {
    common: "普通",
    rare: "稀有",
    epic: "史诗",
    legendary: "传说",
  }

  // 获取DOM元素
  const drawButton = document.getElementById("drawButton")
  const cardDisplay = document.getElementById("cardDisplay")
  const cardHistory = document.getElementById("cardHistory")
  const totalCardsElement = document.getElementById("totalCards")
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  // 显示卡牌总数
  totalCardsElement.textContent = `卡池中共有 ${cardPool.length} 张卡牌`

  // 标签页切换
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab")

      // 更新按钮状态
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // 更新内容显示
      tabContents.forEach((content) => content.classList.remove("active"))
      document.getElementById(`${tabName}Tab`).classList.add("active")
    })
  })

  // 抽卡功能
  drawButton.addEventListener("click", drawCard)

  function drawCard() {
    if (isDrawing) return

    isDrawing = true
    drawButton.disabled = true
    drawButton.textContent = "抽取中..."

    // 清空卡牌显示区域
    cardDisplay.innerHTML = ""

    // 创建卡背
    const cardBack = document.createElement("div")
    cardBack.className = "football-card card-back"
    cardBack.innerHTML = '<div class="card-back-text">FIFA CARD</div>'
    cardDisplay.appendChild(cardBack)

    // 确定稀有度
    setTimeout(() => {
      const rarityRoll = Math.random() * 100
      let rarity

      if (rarityRoll < 45) {
        rarity = "common"
      } else if (rarityRoll < 77) {
        rarity = "rare"
      } else if (rarityRoll < 95) {
        rarity = "epic"
      } else {
        rarity = "legendary"
      }

      // 从对应稀有度的卡池中抽取
      const rarityPool = cardPool.filter((card) => card.rarity === rarity)
      const randomIndex = Math.floor(Math.random() * rarityPool.length)
      const drawnCard = rarityPool[randomIndex]

      // 添加到抽卡历史
      drawnCards.unshift(drawnCard)

      // 显示抽到的卡牌
      cardDisplay.innerHTML = ""
      const cardElement = createCardElement(drawnCard)
      cardElement.classList.add("flip-in")
      cardDisplay.appendChild(cardElement)

      // 更新历史记录
      updateCardHistory()

      // 重置按钮状态
      setTimeout(() => {
        isDrawing = false
        drawButton.disabled = false
        drawButton.textContent = "抽取卡牌"
      }, 500)
    }, 1000) // 翻转动画延迟
  }

  // 创建卡牌元素
  function createCardElement(card, small = false) {
    const cardElement = document.createElement("div")
    cardElement.className = `football-card ${card.rarity} ${small ? "history-card" : ""}`

    const headerClass = small ? "history-card-header" : "card-header"
    const bodyClass = small ? "history-card-body" : "card-body"
    const footerClass = small ? "history-card-footer" : "card-footer"
    const idClass = small ? "history-card-id" : "card-id"

    cardElement.innerHTML = `
            <div class="${headerClass}">
                <div class="card-name">${card.name}</div>
            </div>
            <div class="${bodyClass}">
                <div class="card-effect">${small ? truncateText(card.effect, 20) : card.effect}</div>
            </div>
            <div class="${footerClass}">
                <div class="${idClass}">${card.id}</div>
                <div>${rarityNames[card.rarity]}</div>
            </div>
        `

    return cardElement
  }

  // 更新卡牌历史
  function updateCardHistory() {
    // 清空历史记录区域
    cardHistory.innerHTML = ""

    if (drawnCards.length === 0) {
      cardHistory.innerHTML = '<div class="empty-history">还没有抽取过卡牌</div>'
      return
    }

    // 添加历史记录
    drawnCards.forEach((card, index) => {
      const historyItem = document.createElement("div")
      historyItem.className = "history-item"

      const smallCard = createCardElement(card, true)

      historyItem.innerHTML = `
                <div class="history-card ${card.rarity}">
                    <div class="history-card-header">
                        <div class="card-name">${truncateText(card.name, 8)}</div>
                    </div>
                    <div class="history-card-body">
                        <div class="card-effect"></div>
                    </div>
                    <div class="history-card-footer">
                        <div class="history-card-id">${card.id}</div>
                        <div>${rarityNames[card.rarity]}</div>
                    </div>
                </div>
                <div class="history-info">
                    <div class="history-name">${card.name}</div>
                    <div class="history-effect">${card.effect}</div>
                </div>
            `

      cardHistory.appendChild(historyItem)
    })
  }

  // 文本截断函数
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  // 初始化历史记录
  updateCardHistory()

  // 添加本地存储功能
  function loadFromLocalStorage() {
    const savedCards = localStorage.getItem("drawnCards")
    if (savedCards) {
      drawnCards = JSON.parse(savedCards)
      updateCardHistory()
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("drawnCards", JSON.stringify(drawnCards))
  }

  // 在抽卡后保存到本地存储
  const originalDrawCard = drawCard
  drawCard = () => {
    originalDrawCard()
    setTimeout(() => {
      saveToLocalStorage()
    }, 1500)
  }

  // 加载保存的卡牌
  loadFromLocalStorage()
})
