import urllib.request
import json

def run():
    # 1. Login as eciva
    login_url = "https://new-generation-school.onrender.com/api/auth/login"
    login_data = json.dumps({"login": "eciva", "password": "adiospajasos"}).encode("utf-8")
    req = urllib.request.Request(
        login_url,
        data=login_data,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
        method="POST"
    )
    res = urllib.request.urlopen(req)
    res_json = json.loads(res.read().decode("utf-8"))
    token = res_json["data"]["token"]
    print("eciva token:", token[:25] + "...")

    # 2. Create users
    users_url = "https://new-generation-school.onrender.com/api/auth/users"
    accounts = [
        {
            "username": "boburenforce",
            "email": "boburenforce@ngs.uz",
            "password": "fKSJN#*7324&@(@fjskksl!#$@00",
            "role": "ADMIN",
        },
        {
            "username": "its_sens",
            "email": "its_sens@ngs.uz",
            "password": "Jjs&#*@($@#dscn124bk24blj&*@#GRF@ND",
            "role": "ADMIN",
        },
    ]

    for acc in accounts:
        acc_data = json.dumps(acc).encode("utf-8")
        acc_req = urllib.request.Request(
            users_url,
            data=acc_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}",
                "User-Agent": "Mozilla/5.0",
            },
            method="POST",
        )
        try:
            acc_res = urllib.request.urlopen(acc_req)
            print("Successfully created on Render:", acc["username"], acc_res.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            print("Response for", acc["username"], e.code, e.read().decode("utf-8"))

if __name__ == "__main__":
    run()
