- **Interface:** Select your primary WAN
- **Service:** namecheap
- **Hostname:** Your FQDN
- **Username:** Your root domain
- **Password:** the password generated from Namecheap
- **Server:** leave blank

To verify, SSH into your UDM and run the following command:

``bash inadyn -n -1 -f /run/inadyn.conf

````

You should see output along the lines of this:

```bash
inadyn[12044]: In-a-dyn version 2.5 -- Dynamic DNS update client.
inadyn[12044]: Update forced for alias local, new IP# ###.###.###.###
inadyn[12044]: Updating cache for local
````

## References

- https://community.ui.com/questions/UDM-Pro-Dynamic-DNS/78185299-de97-4da2-8764-fdc3acb08a37?page=2
- https://community.ui.com/questions/UDM-DynDNS-Google-Domains/fe9ba35d-66c3-437d-8323-debe2af55879
- https://community.ui.com/questions/USG-Pro-4-NameCheap-DDNS-Configuration/7a45b5c6-e2a4-49f9-b5a9-222262c781d0
