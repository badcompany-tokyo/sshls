# sshls

```bash
deno run -RE https://raw.githubusercontent.com/badcompany-tokyo/sshls/refs/heads/main/src/main.ts
```

Example

```bash
$ deno run -RE https://raw.githubusercontent.com/badcompany-tokyo/sshls/refs/heads/main/src/main.ts -a
[Host]         [Hostname]       [port]  [user]  
 exmaple        example.com      22      user01  
 example2       100.100.100.100  2222    user02  
 ex1, ex2, ex3  localhost                sysadmin
```

You can execute with binary

```bash
deno compile -RE --output /your/path/sshls https://raw.githubusercontent.com/badcompany-tokyo/sshls/refs/heads/main/src/main.ts
```
