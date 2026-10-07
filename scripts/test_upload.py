import urllib.request
import json

def test():
    login_data = json.dumps({'login': 'eciva', 'password': 'adiospajasos'}).encode('utf-8')
    req = urllib.request.Request('https://new-generation-school.onrender.com/api/auth/login', data=login_data, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
    token = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))['data']['token']

    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    parts = []
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.gif"\r\nContent-Type: image/gif\r\n\r\n'.encode('utf-8'))
    parts.append(b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;')
    parts.append(f'\r\n--{boundary}--\r\n'.encode('utf-8'))
    body = b''.join(parts)

    upload_req = urllib.request.Request(
        'https://new-generation-school.onrender.com/api/admin/media',
        data=body,
        headers={
            'Content-Type': f'multipart/form-data; boundary={boundary}',
            'Authorization': f'Bearer {token}',
            'User-Agent': 'Mozilla/5.0'
        },
        method='POST'
    )

    res = urllib.request.urlopen(upload_req)
    uploaded_data = json.loads(res.read().decode('utf-8'))
    print('Upload response:', uploaded_data)
    uploaded_url = 'https://new-generation-school.onrender.com' + uploaded_data['data']['url']
    print('Checking URL:', uploaded_url)
    check_res = urllib.request.urlopen(urllib.request.Request(uploaded_url, headers={'User-Agent': 'Mozilla/5.0'}))
    print('Accessible! Status:', check_res.status, 'Size:', len(check_res.read()))

if __name__ == '__main__':
    test()
