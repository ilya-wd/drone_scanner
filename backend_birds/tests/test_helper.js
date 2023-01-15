const initialDronesXML = {
  data: `<?xml version="1.0" encoding="UTF-8"?>
<report>
  <deviceInformation deviceId="GUARDB1RD">
    <listenRange>500000</listenRange>
    <deviceStarted>2023-01-14T16:54:41.057Z</deviceStarted>
    <uptimeSeconds>14488</uptimeSeconds>
    <updateIntervalMs>2000</updateIntervalMs>
  </deviceInformation>
  <capture snapshotTimestamp="2023-01-14T20:56:09.083Z">
    <drone>
      <serialNumber>SN-Ks2v0YtNIU</serialNumber>
      <model>Close 1</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>cc:c6:01:14:ad:bb</mac>
      <ipv4>118.90.44.238</ipv4>
      <ipv6>7d64:3f7d:c51b:c783:52d0:a731:e2a6:ba29</ipv6>
      <firmware>1.9.7</firmware>
      <positionY>250000.24716865295</positionY>
      <positionX>250000.4449865535</positionX>
      <altitude>4982.039998671668</altitude>
    </drone>
    <drone>
      <serialNumber>SN-scWYX0jccY</serialNumber>
      <model>Close 2</model>
      <manufacturer>MegaBuzzer Corp</manufacturer>
      <mac>89:88:bb:61:88:fb</mac>
      <ipv4>105.242.68.195</ipv4>
      <ipv6>6bc2:1a0d:6a93:ae73:2c1b:69cc:17f8:69f7</ipv6>
      <firmware>2.4.8</firmware>
      <positionY>262000.7433463176</positionY>
      <positionX>242000.7803562656</positionX>
      <altitude>4378.490281657806</altitude>
    </drone>
    <drone>
      <serialNumber>SN-LLL0eGEFzZ</serialNumber>
      <model>Far 1</model>
      <manufacturer>ProDröne Ltd</manufacturer>
      <mac>b4:08:c2:a7:49:a3</mac>
      <ipv4>204.55.99.231</ipv4>
      <ipv6>8ec3:c808:d97b:d1cc:7012:080d:f2e2:e38e</ipv6>
      <firmware>6.5.9</firmware>
      <positionY>9.72886921864</positionY>
      <positionX>3.73399108283</positionX>
      <altitude>4732.288495152343</altitude>
    </drone>
    <drone>
      <serialNumber>SN-9VurgqVcnt</serialNumber>
      <model>Far 2</model>
      <manufacturer>MegaBuzzer Corp</manufacturer>
      <mac>d5:3f:b5:26:72:b6</mac>
      <ipv4>15.126.123.110</ipv4>
      <ipv6>f8b0:95e3:19cf:4b63:3257:5a7b:4655:a908</ipv6>
      <firmware>5.0.1</firmware>
      <positionY>483283.8720176917</positionY>
      <positionX>487000.18917065623</positionX>
      <altitude>4207.61357932812</altitude>
    </drone>
    <drone>
    <serialNumber>SN-7vW2ETiLNz</serialNumber>
    <model>Close 3</model>
    <manufacturer>DroneGoat Inc</manufacturer>
    <mac>07:39:3b:a8:5a:af</mac>
    <ipv4>20.107.188.118</ipv4>
    <ipv6>8892:971c:a52f:2a44:37df:065c:fa95:b919</ipv6>
    <firmware>9.3.3</firmware>
    <positionY>260000.267252214457</positionY>
    <positionX>251000.7945368918</positionX>
    <altitude>4833.916692612014</altitude>
  </drone>
  <drone>
    <serialNumber>SN-D2Kk6kGnMc</serialNumber>
    <model>Close 4</model>
    <manufacturer>MegaBuzzer Corp</manufacturer>
    <mac>e1:33:e9:4b:0c:c7</mac>
    <ipv4>159.43.37.245</ipv4>
    <ipv6>25ca:1be5:71e4:9eea:9b11:fc6a:0068:0e11</ipv6>
    <firmware>5.2.0</firmware>
    <positionY>263000.61547535723</positionY>
    <positionX>243000.82511379317</positionX>
    <altitude>4690.508629296181</altitude>
  </drone>
  <drone>
    <serialNumber>SN-yAyMRUeqwd</serialNumber>
    <model>Far 3</model>
    <manufacturer>DroneGoat Inc</manufacturer>
    <mac>5b:33:7a:3d:44:9b</mac>
    <ipv4>141.248.238.237</ipv4>
    <ipv6>d7a7:bd95:7b09:b1ae:36d2:26be:4820:5c15</ipv6>
    <firmware>8.3.2</firmware>
    <positionY>2.33156637533</positionY>
    <positionX>1.5324602849</positionX>
    <altitude>4426.964644784682</altitude>
  </drone>
  </capture>
</report>%`,
}

module.exports = { initialDronesXML }
