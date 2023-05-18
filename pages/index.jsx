import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dolor,
  DownArrow,
  Link,
  NFT,
  People,
  Proof,
  Search,
  Timer,
  Twitter,
  Waitlist,
} from "constants/svgIcons";
import { fetchCampaignList } from "services/index";
import moment from "moment";
import poly from "assets/images/polygon.png";

import style from "styles/Home.module.scss";

export default function Home() {
  const [campainList, setCampainList] = useState([]);
  const [campaignTag, setCampaignTag] = useState(["all"]);
  const [next, setNext] = useState(10);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCampaignList();
  }, [next, campaignTag, search]);

  const getCampaignList = async () => {
    setLoading(true);
    const result = await fetchCampaignList(next, campaignTag.join(","), search);
    setCampainList(result?.data?.results);
    setLoading(false);
  };

  const updateTag = (val) => {
    if (val === "all") {
      if (campaignTag.includes(val)) {
        let temp = campaignTag.filter((v) => v !== val);
        setCampaignTag(temp);
      } else {
        setCampaignTag(["all"]);
      }
    } else {
      if (campaignTag.includes(val)) {
        let temp = campaignTag.filter((v) => v !== val);
        setCampaignTag(temp);
      } else {
        if (campaignTag.includes("all")) {
          setCampaignTag([val]);
        } else {
          setCampaignTag([...campaignTag, val]);
        }
      }
    }
  };

  return (
    <>
      <main>
        <section className={style.head}>
          <div className="container">
            <div className={style.headContent}>
              <h2>Quests ({campainList?.length})</h2>
              <div className={style.headSearch}>
                <Search />
                <input
                  type="text"
                  placeholder="Search Quest or Project"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={style.quest}>
          <div className="container">
            <ul className={style.questFilters}>
              <li
                className={campaignTag.includes("all") ? style.active : ""}
                onClick={() => updateTag("all")}
              >
                All
              </li>
              <li
                className={campaignTag.includes("on_chain") ? style.active : ""}
                onClick={() => updateTag("on_chain")}
              >
                <Link /> On Chain
              </li>
              <li
                className={campaignTag.includes("social") ? style.active : ""}
                onClick={() => updateTag("social")}
              >
                <Twitter /> Social
              </li>
              <li
                className={campaignTag.includes("token") ? style.active : ""}
                onClick={() => updateTag("token")}
              >
                <Dolor /> Token
              </li>
              <li
                onClick={() => setMore(true)}
                className={more ? style.more : ""}
                onBlur={() => setMore(false)}
              >
                {/* <input /> */}
                More <DownArrow />
                {more ? (
                  <ul>
                    <li
                      className={
                        campaignTag.includes("proof") ? style.active : ""
                      }
                      onClick={() => updateTag("proof")}
                    >
                      <Proof /> Proof
                    </li>
                    <li
                      className={
                        campaignTag.includes("waitlist") ? style.active : ""
                      }
                      onClick={() => updateTag("waitlist")}
                    >
                      <Waitlist /> Waitlist
                    </li>
                    <li
                      className={
                        campaignTag.includes("NFT") ? style.active : ""
                      }
                      onClick={() => updateTag("NFT")}
                    >
                      <NFT /> NFT
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
          {
            loading ? <h1>Loading...</h1> :
            campainList?.length ? (
              <div className={style.questContainer}>
                {campainList.map((campaign, i) => {
                  const timeLeft = moment.duration(
                    campaign?.start_date,
                    campaign?.end_date
                  )._data;
                  return (
                    <div className={style.questCardSkeliton} key={i}>
                      <div className={style.questCard}>
                        <div className={style.questCardHead}>
                          {
                            <Image
                              src={campaign?.banner_image ?? poly}
                              alt="banner"
                            />
                          }
  
                          <div>
                            <p
                              className={
                                timeLeft?.hours < 3
                                  ? "grey"
                                  : timeLeft?.hours > 3 || timeLeft?.hours < 24
                                  ? "red"
                                  : "green"
                              }
                            >
                              <Timer />
                              {timeLeft?.hours < 24
                                ? timeLeft?.hours + " hrs "
                                : timeLeft.days + " days "}
                              left
                            </p>
                            {timeLeft?.hours < 3 ? (
                              <span>Done</span>
                            ) : timeLeft?.hours > 3 || timeLeft?.hours < 24 ? (
                              ""
                            ) : (
                              <label>NEW ✨</label>
                            )}
                          </div>
                        </div>
                        <h3>{campaign?.name}</h3>
                        <div className={style.questCardBody}>
                          <Image
                            src={`${campaign?.campaign_reward_data?.reward_image}`}
                            width={93}
                            height={93}
                            alt={campaign?.campaign_reward_data?.reward_title}
                          />
                          <p>{campaign?.campaign_reward_data?.reward_title}</p>
                        </div>
                        <div className={style.questCardFooter}>
                          <People />
                          <div>
                            {campaign?.quester_details?.questers_pics.map(
                              (e, i) => {
                                return (
                                  <Image
                                    key={i}
                                    src={`${e}`}
                                    width={26}
                                    height={26}
                                    alt="profile"
                                  />
                                );
                              }
                            )}
                          </div>
                          <p>
                            +{campaign?.quester_details?.questers_count / 1000}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className={style.questCardSkeliton}></div>
                <div className={style.questCardSkeliton}></div>
                <div className={style.questCardSkeliton}></div>
              </div>
            ) : (
              <h1>Oops No Data Found.</h1>
            )}
          
          {!loading &&  campainList?.length >= next ? (
            <a
              onClick={() => setNext(next + 10)}
              className={style.questViewMore}
            >
              View more
            </a>
          ) : (
            ""
          )}
        </section>
      </main>
    </>
  );
}
