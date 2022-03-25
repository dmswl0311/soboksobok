package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.domain.Keyword;
import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.service.KeywordService;
import com.soboksobok.soboksobok.service.WelfareService;
import com.soboksobok.soboksobok.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/welfare")
@RequiredArgsConstructor
public class WelfareController {

    private final WelfareService welfareService;
    private final KeywordService keywordService;

//    @ApiOperation(value = "단일복지 상세데이터")
    @GetMapping("/{welfare_id}")
    public ApiResponse getwelfare(@PathVariable("welfare_id") Long welfare_id) {
        Welfare welfare = welfareService.getWelfare(welfare_id);
        return ApiResponse.success("welfare", welfare);
    }
//    @ApiOperation(value = "단일복지 유사복지 리스트")
    @GetMapping("/{welfare_id}/recommend")
    public ApiResponse getwelfarelike() {
        String keyword = "복지";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }
//    @ApiOperation(value = "사용자 추천 복지 리스트")
    @GetMapping("/recommend/{user_id}")
    public ApiResponse getwelfaregroup() {
        String keyword = "취업";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }
//    @ApiOperation(value = "인기순 복지 리스트")
    @GetMapping("/popular")
    public ApiResponse getwelfarepopular() {
        String keyword = "노인";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "최신순 복지 리스트")
    @GetMapping("/recent")
    public ApiResponse getwelfarerecent() {
        String keyword = "청년";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "복지데이터 검색")
    @GetMapping("/search/{keyword}")
    public ApiResponse welfaresearch(@PathVariable("keyword") String keyword) {
        keywordService.getOrsetKeywordbyname(keyword);
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfares", list);
    }

    @GetMapping("/keyword")
    public ApiResponse loadkeyword() {
        List<Keyword> list = keywordService.getPopularKeyword();
        return ApiResponse.success("keywords", list);
    }
}