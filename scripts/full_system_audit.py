import urllib.request
import urllib.error
import json
import sys

BASE_URL = "https://new-generation-school.onrender.com/api"

def make_req(endpoint, method="GET", data=None, token=None):
    url = f"{BASE_URL}{endpoint}" if endpoint.startswith("/") else f"{BASE_URL}/{endpoint}"
    headers = {"User-Agent": "NGS-Audit/2.0"}
    encoded_data = None
    if data is not None:
        headers["Content-Type"] = "application/json"
        encoded_data = json.dumps(data).encode("utf-8")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            body = res.read().decode("utf-8")
            try:
                parsed = json.loads(body)
            except Exception:
                parsed = body
            return res.status, parsed
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            parsed = json.loads(body)
        except Exception:
            parsed = body
        return e.code, parsed
    except Exception as e:
        return 0, str(e)

def run_tests():
    print("=" * 60)
    print("NGS EXHAUSTIVE SYSTEM STRESS & CRUD AUDIT")
    print("=" * 60)

    # 1. Public endpoints
    print("\n[TEST 1] Public Endpoints Health Check:")
    st, res = make_req("/news")
    print(f"  GET /news -> HTTP {st} (Total news: {len(res.get('data', [])) if isinstance(res, dict) else 'N/A'})")
    assert st == 200, f"Expected 200 on /news, got {st}"

    st, res = make_req("/site/home")
    print(f"  GET /site/home -> HTTP {st} (Sections: {len(res.get('data', {}).get('sections', [])) if isinstance(res, dict) else 'N/A'})")
    assert st == 200, f"Expected 200 on /site/home, got {st}"

    # 2. Public lead submission edge cases
    print("\n[TEST 2] Public Lead Submissions (Dumb User Edge Cases):")
    
    # 2a. Minimal valid lead
    lead_a = {
        "fullName": "Сардор Тестовый",
        "phone": "+998 90 999 88 77",
    }
    st, res = make_req("/applications", "POST", lead_a)
    print(f"  POST /applications (minimal valid) -> HTTP {st} ({'Created' if st == 201 else 'Rate limit active'})")
    assert st in (201, 429), f"Expected 201 or 429, got {st}: {res}"
    lead_a_id = res.get("data", {}).get("id") if st == 201 else None

    # 2b. Lead with nulls and messy spaces
    lead_b = {
        "fullName": "  Малика Каримова  ",
        "phone": "+998 (91) 325-95-65",
        "email": "",
        "childGrade": "Дошкольное отделение (5-6 лет)",
        "type": "consultation",
        "message": "Интересует продленка и питание ребенка."
    }
    st, res = make_req("/applications", "POST", lead_b)
    print(f"  POST /applications (messy spaces & empty email) -> HTTP {st} ({'Created' if st == 201 else 'Rate limiter protected'})")
    assert st in (201, 429), f"Expected 201 or 429, got {st}: {res}"
    lead_b_id = res.get("data", {}).get("id") if st == 201 else None

    # 2c. Invalid lead: too short name
    bad_lead = {
        "fullName": "A",
        "phone": "123",
    }
    st, res = make_req("/applications", "POST", bad_lead)
    print(f"  POST /applications (invalid short name & phone) -> HTTP {st} (Protected / Rejected)")
    assert st in (400, 429), f"Expected 400 or 429 rejection, got {st}"

    # 3. Authentication & Sessions
    print("\n[TEST 3] Auth Endpoints & Credential Security:")
    # 3a. Bad password
    st, res = make_req("/auth/login", "POST", {"login": "eciva", "password": "wrong_password_123"})
    print(f"  POST /auth/login (bad password) -> HTTP {st} (Correctly rejected)")
    assert st == 401, f"Expected 401, got {st}"

    # 3b. Real admin login: eciva
    st, res = make_req("/auth/login", "POST", {"login": "eciva", "password": "adiospajasos"})
    print(f"  POST /auth/login (eciva) -> HTTP {st}")
    assert st == 200, f"Expected 200, got {st}"
    token_eciva = res["data"]["token"]

    # 3c. Ensure boburenforce exists
    st_create, res_create = make_req("/auth/users", "POST", {
        "username": "boburenforce",
        "email": "boburenforce@ngs.uz",
        "password": "fKSJN#*7324&@(@fjskksl!#$@00",
        "role": "ADMIN"
    }, token=token_eciva)
    print(f"  POST /auth/users (provision boburenforce) -> HTTP {st_create}")

    # 3d. Login as boburenforce
    st, res = make_req("/auth/login", "POST", {
        "login": "boburenforce",
        "password": "fKSJN#*7324&@(@fjskksl!#$@00"
    })
    print(f"  POST /auth/login (boburenforce) -> HTTP {st}")
    assert st == 200, f"Expected 200, got {st}"
    token_bobur = res["data"]["token"]

    # 3e. Test /auth/me with boburenforce token
    st, res = make_req("/auth/me", "GET", token=token_bobur)
    print(f"  GET /auth/me (boburenforce) -> HTTP {st} (User: {res.get('data', {}).get('username')})")
    assert st == 200, f"Expected 200, got {st}"

    # 4. Admin Applications Management
    print("\n[TEST 4] Admin Applications Management:")
    st, res = make_req("/admin/applications", "GET", token=token_bobur)
    print(f"  GET /admin/applications -> HTTP {st} (Count: {len(res.get('data', []))})")
    assert st == 200, f"Expected 200, got {st}"

    # Update status of test lead
    target_lead_id = lead_a_id or (res["data"][0]["id"] if len(res.get("data", [])) > 0 else None)
    if target_lead_id:
        st, res_patch = make_req(f"/admin/applications/{target_lead_id}", "PATCH", {
            "status": "CONTACTED",
            "notes": "Позвонили родителю, пригласили на экскурсию в четверг."
        }, token=token_bobur)
        print(f"  PATCH /admin/applications/{target_lead_id} -> HTTP {st} (Status: {res_patch.get('data', {}).get('status')})")
        assert st == 200, f"Expected 200, got {st}"

    # Cleanup test leads
    if lead_a_id:
        st1, _ = make_req(f"/admin/applications/{lead_a_id}", "DELETE", token=token_bobur)
        print(f"  DELETE test lead ({lead_a_id}) -> HTTP {st1}")
    if lead_b_id:
        st2, _ = make_req(f"/admin/applications/{lead_b_id}", "DELETE", token=token_bobur)
        print(f"  DELETE test lead ({lead_b_id}) -> HTTP {st2}")

    # 5. Admin News Lifecycle
    print("\n[TEST 5] News Creation (via frontend ISO date formatter) & Slug Autogeneration:")
    news_payload = {
        "title": "Тестовое открытие инновационной лаборатории NGS",
        "slug": "test-lab-opening-2026",
        "excerpt": "Краткий анонс для карточки",
        "body": "Полный текст тестовой статьи о запуске образовательного проекта.",
        "category": "Олимпиада",
        "date": "2026-06-19T12:00:00.000Z",
        "published": True
    }
    st, res = make_req("/admin/news", "POST", news_payload, token=token_bobur)
    print(f"  POST /admin/news -> HTTP {st}")
    assert st == 201, f"Expected 201, got {st}: {res}"
    created_news_id = res["data"]["id"]
    print(f"    Created news ID: {created_news_id}, generated slug: '{res['data']['slug']}'")

    # Update news
    st, res = make_req(f"/admin/news/{created_news_id}", "PUT", {
        "title": "Обновленный заголовок лаборатории NGS",
        "body": "Обновленный текст публикации",
        "category": "Достижения"
    }, token=token_bobur)
    print(f"  PUT /admin/news/{created_news_id} -> HTTP {st}")
    assert st == 200, f"Expected 200, got {st}"

    # Delete news cleanup
    st, _ = make_req(f"/admin/news/{created_news_id}", "DELETE", token=token_bobur)
    print(f"  DELETE /admin/news/{created_news_id} -> HTTP {st}")
    assert st == 200, f"Expected 200, got {st}"

    # 6. Admin Page Sections Updating & Reordering
    print("\n[TEST 6] Page Sections Update & Reorder:")
    st, res = make_req("/admin/pages", "GET", token=token_bobur)
    print(f"  GET /admin/pages -> HTTP {st}")
    assert st == 200, f"Expected 200, got {st}"

    st, res = make_req("/admin/pages/home", "GET", token=token_bobur)
    print(f"  GET /admin/pages/home -> HTTP {st}")
    assert st == 200, f"Expected 200, got {st}"
    sections = res.get("data", {}).get("sections", [])
    print(f"    Found {len(sections)} sections in 'home'")

    # Test section PATCH
    if len(sections) > 0:
        sec = sections[0]
        st, res = make_req(f"/admin/pages/sections/{sec['id']}", "PATCH", {"visible": sec["visible"]}, token=token_bobur)
        print(f"  PATCH /admin/pages/sections/{sec['id']} -> HTTP {st}")
        assert st == 200, f"Expected 200, got {st}"

    print("\n" + "=" * 60)
    print("ALL 6 TEST SUITES PASSED FLAWLESSLY WITH 0 ERRORS!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
