# Antigravity 通用工程規格（Rules）

## 一、語言與輸出規則

* 所有回復、說明、注釋、文件 **必須使用繁體中文**
* 程式碼中的標示符號維持英文
* 錯誤通知、日誌內容允許為英文


## 二、技術默認規則

* 前端：默認使用 **React + TypeScript**
* 後端：默認使用 **Python（優先 FastAPI）**
* 若無特殊說明，均遵行以上程式語言規定


## 三、通用程式碼規定

### 命名規定

* 變量 / 函數：camelCase
* 類 / 組件：PascalCase
* 常量：UPPER_SNAKE_CASE
* 文件 / 資料夾：kebab-case

命名應語意清晰，禁止随意縮寫。


### 注釋規則（強制）

* 注釋用於解釋「為甚麼這樣設計」，而不是程式碼字面含意
* 複雜邏輯、業務判斷、邊界條件必須寫注釋
* 禁止無異議注釋

統一注釋標記：

```ts
// TODO: 待實現功能
// FIXME: 已知問題或潛在缺陷
// NOTE: 重要設計說明
// HACK: 臨時方案，後續必須重構
```

#### 函數注釋規則

前端（JSDoc）：

```ts
/**
 * 獲取用戶資訊
 * @param userId 用戶 ID
 * @returns 用戶數據
 */
```

後端（Python Docstring）：

```python
def get_user(user_id: str):
    """
    根據用戶 ID 獲取用戶資訊
    """
```


## 四、前端規則（React）

### 基本原則

* 使用函數組件，不使用類組件
* 單個組件只承擔單一職責
* 展示邏輯與業務邏輯分離
* 可復用邏輯必須抽離自訂義 Hook


### 命名規則

* 組件名使用 PascalCase
* 文件名與組件名保持一致
* 自定義 Hook 必須以 `use` 開頭

```ts
function UserCard() {}
function useUserData() {}
```


### Hooks 使用規則

* 只能在函數組件或自定義 Hook 中調用
* 不允許在條件、循環中調用
* 一個 Hook 只處理一種職責


### Props 規定

* 必須使用 TypeScript 類型定義
* 使用解構方式接收 props
* 非必傳參數使用 `?`

```ts
interface UserCardProps {
  user: User
  onClick?: () => void
}
```


### 性能與結構要求

* 避免不必要的重複渲染
* 合理使用 useMemo / useCallback
* 列表渲染必須提供穩定的 key
* 大數據列表使用虛擬滾動
* 路由與組件支持懶加載


## 五、後端規則（Python）

### 基本要求

* Python ≥ 3.10
* 優先使用 FastAPI
* 所有函數與方法必須標註類型
* 禁止使用裸 `except`
* 禁止使用 `print` 作为日誌方式


### 分層結構（必須遵守）

* api：請求解析與響應封裝
* service：業務邏輯處理
* repository：資料庫訪問
* schema：請求 / 響應數據校驗
* model：ORM 模型定義

禁止在 api 層直接操作資料庫。


### 日誌規則

* 使用 logging 模塊
* 合理區分日誌級別（DEBUG / INFO / WARNING / ERROR）
* 日誌中不得包含敏感信息


## 六、安全規則（重點）

### 通用安全原則

* 永遠不信任客户端输入
* 所有輸入必需進行校驗
* 敏感操作必須經過身分與權限校驗


### 前端安全

* 禁止使用 dangerouslySetInnerHTML
* 防止 XSS / CSRF 攻擊
* Token 推薦使用 HttpOnly Cookie


### 後端安全

* 使用 Pydantic 進行參數校驗
* 權限校驗必須在 service 層完成
* 所有密鑰從環境變量中讀取

```python
import os
SECRET_KEY = os.getenv("SECRET_KEY")
```

* 密碼等敏感資訊需加密存取


## 七、AI 協作使用規則

* 所有自動生成的程式碼必須遵守此規則
* 生成結果應該：

  * 結構清晰
  * 類型完整
  * 可維護
  * 安全
* 不生成不必要的複雜實現
